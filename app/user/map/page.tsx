"use client";

import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./page.module.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useTruckStore from "@/store/useTruckStore";
import { Trucks, COLORS } from "@/types";
import { debounce } from "lodash";
import { Id } from "@/convex/_generated/dataModel";

// Define GeoJSON types
type TruckFeatureProperties = {
    id: Id<"trucks">;
    name: string;
    open: boolean;
    categories?: string[];
    description?: string;
};

type TruckPointGeometry = {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
};

type TruckFeature = {
    type: "Feature";
    geometry: TruckPointGeometry;
    properties: TruckFeatureProperties;
};

type TruckFeatureCollection = {
    type: "FeatureCollection";
    features: TruckFeature[];
};

// Map source and layer IDs
const TRUCKS_SOURCE_ID = "trucks-source";
const TRUCKS_LAYER_ID = "trucks-layer";
const TRUCKS_CLUSTERS_LAYER_ID = "trucks-clusters-layer";
const TRUCKS_CLUSTER_COUNT_LAYER_ID = "trucks-cluster-count-layer";
const SELECTED_TRUCK_SOURCE_ID = "selected-truck-source";
const SELECTED_TRUCK_LAYER_ID = "selected-truck-layer";

// Inside your updateTruckSource callback:
const primaryColor = COLORS.colorPrimary;
const grayDarkColor = COLORS.colorGrayDark;
const whiteColor = COLORS.colorWhite;
const blackColor = COLORS.colorBlack;

// Default coordinates (can be replaced with your desired starting location)
const DEFAULT_CENTER: [number, number] = [-73.982497903354, 40.76979307438114]; // NYIT
const DEFAULT_ZOOM = 14;

export default function UserMapPage() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const popup = useRef<mapboxgl.Popup | null>(null);

    const [mapLoaded, setMapLoaded] = useState(false);
    const [viewport, setViewport] = useState({
        topLat: 0,
        bottomLat: 0,
        leftLng: 0,
        rightLng: 0,
    });

    // Zustand truck store hooks
    const {
        persistedTrucks,
        setPersistedTrucks,
        setSelectedTruckId,
        selectedTruckId,
        selectedTruck,
    } = useTruckStore();

    // Convex query for trucks in viewport
    const trucks = useQuery(api.trucks.getTrucksInViewport, viewport);

    // Update persisted trucks when new trucks are loaded
    useEffect(() => {
        if (trucks && trucks.length > 0) {
            setPersistedTrucks(trucks);
        }
    }, [trucks, setPersistedTrucks]);

    // Create a debounced function for updating the viewport
    const updateViewport = useCallback(
        debounce((map: mapboxgl.Map) => {
            const bounds = map.getBounds();
            if (bounds) {
                setViewport({
                    topLat: bounds.getNorth(),
                    bottomLat: bounds.getSouth(),
                    leftLng: bounds.getWest(),
                    rightLng: bounds.getEast(),
                });
            }
        }, 300),
        []
    );

    // Create GeoJSON feature collection from trucks
    const truckFeatures = useMemo((): TruckFeatureCollection => {
        if (!persistedTrucks || persistedTrucks.length === 0) {
            return {
                type: "FeatureCollection",
                features: [],
            };
        }

        return {
            type: "FeatureCollection",
            features: persistedTrucks
                .filter(
                    (
                        truck
                    ): truck is Trucks & {
                        latitude: number;
                        longitude: number;
                    } =>
                        typeof truck.latitude === "number" &&
                        typeof truck.longitude === "number"
                )
                .map((truck) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [truck.longitude, truck.latitude],
                    },
                    properties: {
                        id: truck._id,
                        name: truck.truck_name,
                        open: truck.open_status,
                        categories: truck.categories,
                        description: truck.location,
                    },
                })),
        };
    }, [persistedTrucks]);

    // Add or update the trucks source on the map
    const updateTruckSource = useCallback(() => {
        if (!map.current || !mapLoaded) return;

        const source = map.current.getSource(TRUCKS_SOURCE_ID);

        if (source) {
            // Update existing source
            (source as mapboxgl.GeoJSONSource).setData(truckFeatures);
        } else {
            // Create new source and layers if they don't exist
            map.current.addSource(TRUCKS_SOURCE_ID, {
                type: "geojson",
                data: truckFeatures,
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points
                clusterRadius: 50, // Radius of each cluster when clustering points
            });

            // Add a layer for the clusters
            map.current.addLayer({
                id: TRUCKS_CLUSTERS_LAYER_ID,
                type: "circle",
                source: TRUCKS_SOURCE_ID,
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": [
                        "step",
                        ["get", "point_count"],
                        primaryColor, // Color for smaller clusters
                        5,
                        primaryColor, // Color for medium clusters
                        10,
                        primaryColor, // Color for larger clusters
                    ],
                    "circle-radius": [
                        "step",
                        ["get", "point_count"],
                        20, // Size for smaller clusters
                        5,
                        25, // Size for medium clusters
                        10,
                        30, // Size for larger clusters
                    ],
                },
            });

            // Add a layer for the cluster counts
            map.current.addLayer({
                id: TRUCKS_CLUSTER_COUNT_LAYER_ID,
                type: "symbol",
                source: TRUCKS_SOURCE_ID,
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-size": 15,
                },
                paint: {
                    "text-color": whiteColor,
                },
            });

            // Add a layer for the individual trucks
            map.current.addLayer({
                id: TRUCKS_LAYER_ID,
                type: "symbol",
                source: TRUCKS_SOURCE_ID,
                filter: ["!", ["has", "point_count"]],
                layout: {
                    "icon-image": "truck-icon",
                    "icon-size": 0.05,
                    "icon-allow-overlap": true,
                    "text-field": ["get", "name"],
                    "text-font": [
                        "DIN Offc Pro Medium",
                        "Arial Unicode MS Bold",
                    ],
                    "text-offset": [0, 1.25],
                    "text-anchor": "top",
                    "text-optional": true,
                    "text-size": 12,
                },
                paint: {
                    "text-color": blackColor,
                    "text-halo-color": whiteColor,
                    "text-halo-width": 1,
                    "icon-opacity": [
                        "case",
                        ["get", "open"],
                        1, // If truck is open, full opacity
                        0.5, // If truck is closed, reduced opacity
                    ],
                    "icon-color": [
                        "case",
                        ["get", "open"],
                        primaryColor, // If truck is open, use primary color
                        grayDarkColor, // If truck is closed, use gray
                    ],
                },
            });
        }
    }, [mapLoaded, truckFeatures]);

    // Initialize map
    useEffect(() => {
        // Only initialize the map if we're in the browser and the component is mounted
        if (!mapContainer.current) return;

        // Initialize Mapbox
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? "";

        // Create the map instance
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12", // Default style
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
        });

        // Add navigation controls (zoom in/out, etc.)
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add geolocation control
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            }),
            "top-right"
        );

        // Create popup but don't add to map yet
        popup.current = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true,
            offset: [0, -10],
            className: styles.truckPopup,
        });

        // Set up event listeners
        map.current.on("load", () => {
            setMapLoaded(true);
            console.log("Map loaded successfully");

            // Load truck icon image
            map.current!.loadImage("/images/truck-icon.png", (error, image) => {
                if (error) throw error;

                if (image && !map.current!.hasImage("truck-icon")) {
                    map.current!.addImage("truck-icon", image);

                    // Initialize viewport after icon loads
                    updateViewport(map.current!);
                }
            });

            // Add click events for clusters
            map.current!.on("click", TRUCKS_CLUSTERS_LAYER_ID, (e) => {
                const features = map.current!.queryRenderedFeatures(e.point, {
                    layers: [TRUCKS_CLUSTERS_LAYER_ID],
                });

                if (features.length === 0 || !features[0].properties) return;

                const clusterId = features[0].properties.cluster_id;

                if (clusterId) {
                    const source = map.current!.getSource(
                        TRUCKS_SOURCE_ID
                    ) as mapboxgl.GeoJSONSource;
                    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
                        if (err) return;

                        const geometry = features[0].geometry as GeoJSON.Point;
                        const coordinates = geometry.coordinates as [
                            number,
                            number,
                        ];

                        map.current!.easeTo({
                            center: coordinates,
                            zoom: zoom! + 1,
                        });
                    });
                }
            });

            // Add click events for individual trucks
            map.current!.on("click", TRUCKS_LAYER_ID, (e) => {
                if (!e.features || e.features.length === 0) return;

                const feature = e.features[0];
                const props = feature.properties;

                if (props && props.id) {
                    const truckId = props.id as Id<"trucks">;
                    setSelectedTruckId(truckId);

                    // Fly to the truck
                    const geometry = feature.geometry as GeoJSON.Point;
                    const coordinates = geometry.coordinates as [
                        number,
                        number,
                    ];

                    map.current!.flyTo({
                        center: coordinates,
                        zoom: 15,
                        essential: true,
                    });
                }
            });

            // Change cursor on hover
            map.current!.on("mouseenter", TRUCKS_LAYER_ID, () => {
                map.current!.getCanvas().style.cursor = "pointer";
            });

            map.current!.on("mouseleave", TRUCKS_LAYER_ID, () => {
                map.current!.getCanvas().style.cursor = "";
            });

            map.current!.on("mouseenter", TRUCKS_CLUSTERS_LAYER_ID, () => {
                map.current!.getCanvas().style.cursor = "pointer";
            });

            map.current!.on("mouseleave", TRUCKS_CLUSTERS_LAYER_ID, () => {
                map.current!.getCanvas().style.cursor = "";
            });
        });

        // Update viewport when map moves
        map.current.on("moveend", () => {
            if (map.current) {
                updateViewport(map.current);
            }
        });

        // Clean up on unmount
        return () => {
            if (popup.current) {
                popup.current.remove();
            }

            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [updateViewport, setSelectedTruckId]);

    // Update truck source when trucks change
    useEffect(() => {
        updateTruckSource();
    }, [truckFeatures, updateTruckSource]);

    // Highlight selected truck
    useEffect(() => {
        if (!map.current || !mapLoaded || !selectedTruckId) return;

        // Remove existing highlight layer and source
        if (map.current.getLayer(SELECTED_TRUCK_LAYER_ID)) {
            map.current.removeLayer(SELECTED_TRUCK_LAYER_ID);
        }

        if (map.current.getSource(SELECTED_TRUCK_SOURCE_ID)) {
            map.current.removeSource(SELECTED_TRUCK_SOURCE_ID);
        }

        const selectedFeature = truckFeatures.features.find(
            (feature) => feature.properties.id === selectedTruckId
        );

        if (selectedFeature) {
            // Create a source for the selected truck
            map.current.addSource(SELECTED_TRUCK_SOURCE_ID, {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [selectedFeature],
                } as TruckFeatureCollection,
            });

            // Add a highlight circle around the selected truck
            map.current.addLayer(
                {
                    id: SELECTED_TRUCK_LAYER_ID,
                    type: "circle",
                    source: SELECTED_TRUCK_SOURCE_ID,
                    paint: {
                        "circle-radius": 40,
                        "circle-color": whiteColor,
                        "circle-opacity": 0.4,
                        "circle-stroke-width": 2,
                        "circle-stroke-color": primaryColor,
                    },
                },
                TRUCKS_LAYER_ID
            ); // Add below the trucks layer
        }

        // Clean up the highlight when unmounting or when selected truck changes
        return () => {
            if (map.current) {
                if (map.current.getLayer(SELECTED_TRUCK_LAYER_ID)) {
                    map.current.removeLayer(SELECTED_TRUCK_LAYER_ID);
                }

                if (map.current.getSource(SELECTED_TRUCK_SOURCE_ID)) {
                    map.current.removeSource(SELECTED_TRUCK_SOURCE_ID);
                }
            }
        };
    }, [selectedTruckId, mapLoaded, truckFeatures.features]);

    return (
        <div className={styles.mapPageWrapper}>
            <div className={styles.mapContainer} ref={mapContainer}>
                {!mapLoaded && (
                    <div className={styles.loadingOverlay}>
                        <p>Loading map...</p>
                    </div>
                )}
            </div>

            {/* Truck details panel when a truck is selected */}
            {selectedTruck && (
                <div className={styles.truckInfoPanel}>
                    <div className={styles.truckInfoHeader}>
                        <h3>{selectedTruck.truck_name}</h3>
                        <span
                            className={`${styles.statusIndicator} ${selectedTruck.open_status ? styles.open : styles.closed}`}
                        >
                            {selectedTruck.open_status ? "Open" : "Closed"}
                        </span>
                    </div>

                    {selectedTruck.categories &&
                        selectedTruck.categories.length > 0 && (
                            <div className={styles.truckCategories}>
                                {selectedTruck.categories.map((category) => (
                                    <span
                                        key={category}
                                        className={styles.categoryTag}
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}

                    {selectedTruck.location && (
                        <p className={styles.truckLocation}>
                            {selectedTruck.location}
                        </p>
                    )}

                    <button
                        className={styles.closeButton}
                        onClick={() => setSelectedTruckId(null)}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}

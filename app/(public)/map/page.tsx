"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./page.module.css";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY!;

export default function MapPage() {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const { isSignedIn } = useUser();
    const [hasFetchedInitial, setHasFetchedInitial] = useState(false);
    const [hasFetchedAfterLocation, setHasFetchedAfterLocation] =
        useState(false);

    const [viewport, setViewport] = useState<{
        topLat: number;
        bottomLat: number;
        leftLng: number;
        rightLng: number;
    } | null>(null);

    const [showPrompt, setShowPrompt] = useState(false);

    const trucks = useQuery(
        api.trucks.getTrucksInViewportPublic,
        viewport ?? "skip"
    );

    console.log("Trucks in viewport:", trucks);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-74.006, 40.7128],
            zoom: 12,
        });

        const bounds = map.getBounds();
        if (bounds && !hasFetchedInitial) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            setViewport({
                topLat: ne.lat,
                bottomLat: sw.lat,
                leftLng: sw.lng,
                rightLng: ne.lng,
            });
            setHasFetchedInitial(true);
        }

        mapRef.current = map;
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true,
                showUserLocation: true,
            }),
            "top-right"
        );

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const center = [coords.longitude, coords.latitude];
                map.flyTo({ center: center as [number, number], zoom: 14 });

                map.once("moveend", () => {
                    if (!hasFetchedAfterLocation) {
                        const bounds = map.getBounds();
                        if (bounds) {
                            const ne = bounds.getNorthEast();
                            const sw = bounds.getSouthWest();
                            setViewport({
                                topLat: ne.lat,
                                bottomLat: sw.lat,
                                leftLng: sw.lng,
                                rightLng: ne.lng,
                            });
                            setHasFetchedAfterLocation(true);
                        }
                    }
                });
            },
            (error) => console.warn("Geolocation error:", error.message)
        );

        map.on("moveend", () => {
            if (!isSignedIn) {
                setShowPrompt(true);
            }
        });

        return () => {
            map.remove();
        };
    }, [isSignedIn, hasFetchedInitial, hasFetchedAfterLocation]);

    useEffect(() => {
        if (!mapRef.current || !trucks) return;

        // Remove existing markers if needed (not shown here)
        trucks.forEach((truck) => {
            if (truck.latitude && truck.longitude) {
                const el = document.createElement("div");
                el.className = styles.truckMarker;

                el.addEventListener("click", () => {
                    if (!isSignedIn) setShowPrompt(true);
                });

                const icon = document.createElement("img");
                icon.src = "/images/truck-icon.png";
                icon.alt = "Truck Icon";
                icon.className = styles.truckIcon;
                el.appendChild(icon);

                new mapboxgl.Marker(el)
                    .setLngLat([truck.longitude, truck.latitude])
                    .addTo(mapRef.current!);
            }
        });
    }, [trucks, isSignedIn]);

    return (
        <section className={styles.mapPage}>
            <div ref={mapContainerRef} className={styles.mapContainer} />
            {showPrompt && (
                <div className={styles.promptBox}>
                    <p>Sign in to explore more areas and vendor details</p>
                </div>
            )}
        </section>
    );
}

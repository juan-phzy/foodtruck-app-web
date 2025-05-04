"use client";

/*
	/app/user/map/page.tsx
*/

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./page.module.css";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY!;

export default function UserMapPage() {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const { isSignedIn } = useUser();

    const [viewport, setViewport] = useState<{
        topLat: number;
        bottomLat: number;
        leftLng: number;
        rightLng: number;
    } | null>(null);


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
        if (bounds) {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            setViewport({
                topLat: ne.lat,
                bottomLat: sw.lat,
                leftLng: sw.lng,
                rightLng: ne.lng,
            });
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
		map.addControl( new mapboxgl.FullscreenControl(), "top-right");

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const center = [coords.longitude, coords.latitude];
                map.flyTo({ center: center as [number, number], zoom: 14 });

                map.once("moveend", () => {
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
                        }
                });
            },
            (error) => console.warn("Geolocation error:", error.message)
        );

        return () => {
            map.remove();
        };
    }, [isSignedIn]);

    useEffect(() => {
        if (!mapRef.current || !trucks) return;

        // Remove existing markers if needed (not shown here)
        trucks.forEach((truck) => {
            if (truck.latitude && truck.longitude) {
                const el = document.createElement("div");
                el.className = styles.truckMarker;

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
        </section>
    );
}
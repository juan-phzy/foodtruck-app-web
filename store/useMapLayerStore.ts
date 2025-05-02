import { create } from "zustand";
import Mapbox from "@rnmapbox/maps";

interface MapLayerState {
    mapStyle: string;
    setMapStyle: (style: string) => void;
}

const useMapLayerStore = create<MapLayerState>((set) => ({
    mapStyle: Mapbox.StyleURL.Street,
    setMapStyle: (style) => set({ mapStyle: style }),
}));

export default useMapLayerStore;

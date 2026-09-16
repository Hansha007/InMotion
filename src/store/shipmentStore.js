import { create } from "zustand";
import { shipments as initialShipments } from "../data/shipments";

export const useShipmentStore = create((set) => ({
  shipments: initialShipments,

  updateShipment: (shipmentId, updates) =>
    set((state) => ({
      shipments: state.shipments.map((shipment) =>
        shipment.id === shipmentId
          ? { ...shipment, ...updates }
          : shipment
      ),
    })),

  markPriority: (shipmentIds) =>
    set((state) => ({
      shipments: state.shipments.map((shipment) =>
        shipmentIds.includes(shipment.id)
          ? { ...shipment, priority: "High" }
          : shipment
      ),
    })),

  setPriority: (shipmentId, priority) =>
    set((state) => ({
      shipments: state.shipments.map((shipment) =>
        shipment.id === shipmentId
          ? { ...shipment, priority }
          : shipment
      ),
    })),

  getShipmentById: (shipmentId) => {
    const state = useShipmentStore.getState();

    return state.shipments.find(
      (shipment) => shipment.id === shipmentId
    );
  },
}));
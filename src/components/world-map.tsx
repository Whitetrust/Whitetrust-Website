"use client";

import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const INK = "#0F1B3D";
const BRONZE = "#B08D57";
const LAND = "#E5DFD3";
const LAND_STROKE = "#D6CFBE";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Node = { coords: [number, number]; label: string; align?: "left" | "right" | "center"; offsetY?: number };

const HUB: Node = { coords: [72.8777, 19.076], label: "Mumbai · GIFT City", align: "right", offsetY: 24 };
const NODES: Node[] = [
  { coords: [-74.006, 40.7128], label: "US · NY / SF", align: "left", offsetY: -14 },
  { coords: [-0.1278, 51.5074], label: "UK · London", align: "right", offsetY: -14 },
  { coords: [55.2708, 25.2048], label: "UAE · Dubai", align: "left", offsetY: -14 },
  { coords: [103.8198, 1.3521], label: "Singapore", align: "left", offsetY: 22 },
];

export function WorldMap() {
  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 165, center: [20, 15] }}
        width={980}
        height={500}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={LAND}
                stroke={LAND_STROKE}
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: LAND },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {NODES.map((n, i) => (
          <Line
            key={i}
            from={HUB.coords}
            to={n.coords}
            stroke={BRONZE}
            strokeWidth={1.4}
            strokeDasharray="3 4"
            strokeLinecap="round"
          />
        ))}

        <Marker coordinates={HUB.coords}>
          <g>
            <circle r={10} fill={BRONZE} />
            <circle r={16} fill="none" stroke={BRONZE} strokeWidth={1} opacity={0.5} />
            <circle r={22} fill="none" stroke={BRONZE} strokeWidth={0.5} opacity={0.3} />
            <text
              y={HUB.offsetY ?? 22}
              textAnchor={HUB.align === "right" ? "start" : HUB.align === "left" ? "end" : "middle"}
              x={HUB.align === "right" ? 16 : HUB.align === "left" ? -16 : 0}
              fontFamily="Inter, sans-serif"
              fontSize={13}
              fontWeight={600}
              fill={INK}
            >
              {HUB.label}
            </text>
          </g>
        </Marker>

        {NODES.map((n, i) => (
          <Marker key={i} coordinates={n.coords}>
            <g>
              <circle r={6} fill={INK} />
              <circle r={10} fill="none" stroke={INK} strokeWidth={0.8} opacity={0.35} />
              <text
                y={n.offsetY ?? -14}
                textAnchor={n.align === "right" ? "start" : n.align === "left" ? "end" : "middle"}
                x={n.align === "right" ? 12 : n.align === "left" ? -12 : 0}
                fontFamily="Inter, sans-serif"
                fontSize={12}
                fontWeight={500}
                fill={INK}
              >
                {n.label}
              </text>
            </g>
          </Marker>
        ))}
      </ComposableMap>

      <p className="mt-4 text-xs text-muted text-center">
        Diaspora corridor — Mumbai &amp; GIFT City connected to client clusters in the US, UK, UAE and Singapore.
      </p>
    </div>
  );
}

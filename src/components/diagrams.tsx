// Schematic SVG diagrams for trust structures and IFSC flows.
// Styled to match the bronze/navy/ivory palette. All flat lines + nodes — no decoration.

const INK = "#0F1B3D";
const BRONZE = "#B08D57";
const LINE = "#E5DFD3";
const MUTED = "#6B6256";

function Frame({ children, viewBox = "0 0 720 420", className = "" }: { children: React.ReactNode; viewBox?: string; className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="w-full h-auto block"
      >
        <defs>
          <marker
            id="arrow-bronze"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={BRONZE} />
          </marker>
          <marker
            id="arrow-ink"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} opacity="0.4" />
          </marker>
        </defs>
        {children}
      </svg>
    </div>
  );
}

function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  variant = "outline",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  variant?: "outline" | "fill-ink" | "fill-bronze";
}) {
  const fill = variant === "fill-ink" ? INK : variant === "fill-bronze" ? BRONZE : "#FAF7F2";
  const stroke = variant === "outline" ? INK : variant === "fill-ink" ? INK : BRONZE;
  const titleColor = variant === "outline" ? INK : "#FAF7F2";
  const subColor = variant === "outline" ? MUTED : "#FAF7F2";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text
        x={x + w / 2}
        y={y + (sub ? h / 2 - 6 : h / 2 + 5)}
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
        fill={titleColor}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          fontFamily="Inter, sans-serif"
          fontSize="11"
          textAnchor="middle"
          fill={subColor}
          opacity="0.85"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Label({ x, y, text, anchor = "middle" }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text
      x={x}
      y={y}
      fontFamily="Inter, sans-serif"
      fontSize="11"
      textAnchor={anchor}
      fill={MUTED}
      style={{ letterSpacing: "0.05em" }}
    >
      {text}
    </text>
  );
}

function Arrow({ x1, y1, x2, y2, bronze = false, dashed = false }: { x1: number; y1: number; x2: number; y2: number; bronze?: boolean; dashed?: boolean }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={bronze ? BRONZE : INK}
      strokeOpacity={bronze ? 1 : 0.45}
      strokeWidth="1.5"
      strokeDasharray={dashed ? "4 4" : "none"}
      markerEnd={bronze ? "url(#arrow-bronze)" : "url(#arrow-ink)"}
    />
  );
}

// =================================================================
// 1. Discretionary Family Trust — Settlor → Trust → Beneficiaries
// =================================================================

export function DiagramTrustFlow() {
  return (
    <Frame viewBox="0 0 720 420">
      <Node x={300} y={20} w={120} h={56} title="Settlor" sub="(Client)" variant="fill-ink" />
      <Arrow x1={360} y1={76} x2={360} y2={146} bronze />
      <Label x={376} y={114} text="transfers assets" anchor="start" />

      <Node x={250} y={150} w={220} h={70} title="Family Trust" sub="Irrevocable · Discretionary" variant="fill-bronze" />
      <Label x={486} y={185} text="CAWT acts as professional trustee" anchor="start" />
      <Arrow x1={490} y1={185} x2={470} y2={185} />

      <Arrow x1={360} y1={220} x2={150} y2={290} />
      <Arrow x1={360} y1={220} x2={360} y2={290} />
      <Arrow x1={360} y1={220} x2={570} y2={290} />
      <Label x={360} y={252} text="benefits" />

      <Node x={80} y={290} w={140} h={56} title="Wife" />
      <Node x={290} y={290} w={140} h={56} title="Son" />
      <Node x={500} y={290} w={140} h={56} title="Grandchildren" sub="(contingent)" />

      <line x1={60} y1={380} x2={660} y2={380} stroke={LINE} strokeWidth="1" />
      <text x={60} y={400} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED}>
        Beneficiaries — distributions guided by Letter of Wishes
      </text>
    </Frame>
  );
}

// =================================================================
// 2. Two-Pillar Plan — Family Trust + Will (cross-border family)
// =================================================================

export function DiagramTwoPillar() {
  return (
    <Frame viewBox="0 0 800 460">
      <Node x={320} y={20} w={160} h={60} title="Mr. A" sub="(Settlor)" variant="fill-ink" />

      <Arrow x1={360} y1={80} x2={180} y2={160} />
      <Arrow x1={440} y1={80} x2={620} y2={160} />

      <Node x={60} y={160} w={240} h={80} title="Family Trust" sub="Financial assets + InvCo shares" variant="fill-bronze" />
      <Node x={500} y={160} w={240} h={80} title="Will" sub="Real Estate" variant="outline" />

      <Arrow x1={130} y1={240} x2={110} y2={330} />
      <Arrow x1={230} y1={240} x2={250} y2={330} />
      <Arrow x1={620} y1={240} x2={620} y2={330} />

      <Node x={40} y={330} w={160} h={56} title="Mrs. A" />
      <Node x={220} y={330} w={160} h={56} title="3 Children" />
      <Node x={520} y={330} w={200} h={56} title="Heirs (per will)" />

      <text x={210} y={420} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
        FEMA / OPI / LRS compliant for NRI beneficiaries
      </text>
      <text x={620} y={420} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
        Probate via Indian courts
      </text>
    </Frame>
  );
}

// =================================================================
// 3. Family Office Hub & Spoke
// =================================================================

export function DiagramHubSpoke() {
  const cx = 360;
  const cy = 210;
  const r = 130;
  const spokes = [
    { label: "Estate & Succession Planning", angle: -Math.PI / 2 },
    { label: "Wills & Executorship", angle: -Math.PI / 6 },
    { label: "Family Governance", angle: Math.PI / 6 },
    { label: "Cross Border Structuring", angle: Math.PI / 2 },
    { label: "Partnership Firms/LLP", angle: (5 * Math.PI) / 6 },
    { label: "Compliance & Administration", angle: (7 * Math.PI) / 6 },
  ];
  return (
    <Frame viewBox="0 0 720 420">
      {spokes.map((s, i) => {
        const x = cx + Math.cos(s.angle) * r;
        const y = cy + Math.sin(s.angle) * r;
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={BRONZE} strokeWidth="1.2" opacity="0.6" />;
      })}
      <circle cx={cx} cy={cy} r="56" fill={INK} />
      <text x={cx} y={cy - 4} fontFamily="Inter, sans-serif" fontSize="16" fontWeight="600" fill="#FAF7F2" textAnchor="middle">
        CAWT
      </text>
      <text x={cx} y={cy + 14} fontFamily="Inter, sans-serif" fontSize="11" fill="#FAF7F2" opacity="0.7" textAnchor="middle">
        Family Office
      </text>
      {spokes.map((s, i) => {
        const x = cx + Math.cos(s.angle) * r;
        const y = cy + Math.sin(s.angle) * r;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="50" fill="#FAF7F2" stroke={BRONZE} strokeWidth="1.5" />
            <text
              x={x}
              y={y + 4}
              fontFamily="Inter, sans-serif"
              fontSize="10"
              fontWeight="500"
              fill={INK}
              textAnchor="middle"
            >
              {wrapTwoLine(s.label).map((ln, idx) => (
                <tspan key={idx} x={x} dy={idx === 0 ? -4 : 12}>
                  {ln}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

function wrapTwoLine(s: string): string[] {
  const parts = s.split(" ");
  if (parts.length <= 1) return [s];
  if (parts.length === 2) return parts;
  // Split roughly in half
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

// =================================================================
// 4. IFSC Inbound — Global capital → India
// =================================================================

export function DiagramInbound() {
  return (
    <Frame viewBox="0 0 720 420">
      <Label x={120} y={32} text="GLOBAL" />
      <Label x={360} y={32} text="GIFT IFSC" />
      <Label x={600} y={32} text="INDIA" />

      <line x1={240} y1={48} x2={240} y2={400} stroke={LINE} strokeWidth="1" strokeDasharray="3 3" />
      <line x1={480} y1={48} x2={480} y2={400} stroke={LINE} strokeWidth="1" strokeDasharray="3 3" />

      <Node x={40} y={170} w={160} h={60} title="Global Investors" />
      <Arrow x1={200} y1={200} x2={280} y2={200} bronze />

      <Node x={280} y={120} w={160} h={50} title="CAWT FME" variant="fill-ink" />
      <Node x={280} y={190} w={160} h={50} title="IFSC AIF" variant="fill-bronze" />
      <Node x={280} y={260} w={160} h={50} title="IFSC AIF #2" variant="outline" />

      <Arrow x1={360} y1={170} x2={360} y2={190} dashed />
      <Arrow x1={360} y1={240} x2={360} y2={260} dashed />

      <Arrow x1={440} y1={215} x2={520} y2={215} bronze />

      <Node x={520} y={140} w={160} h={45} title="FPI route" sub="Listed equity" />
      <Node x={520} y={200} w={160} h={45} title="AIF route" sub="Cat I / II / III" />
      <Node x={520} y={260} w={160} h={45} title="FDI route" sub="Strategic equity" />

      <text x={360} y={350} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
        Each AIF has segregated assets, liabilities, and Principal Officer
      </text>
    </Frame>
  );
}

// =================================================================
// 5. IFSC Outbound — Indian capital → Global
// =================================================================

export function DiagramOutbound() {
  return (
    <Frame viewBox="0 0 720 420">
      <Label x={120} y={32} text="INDIA" />
      <Label x={360} y={32} text="GIFT IFSC" />
      <Label x={600} y={32} text="GLOBAL" />

      <line x1={240} y1={48} x2={240} y2={400} stroke={LINE} strokeWidth="1" strokeDasharray="3 3" />
      <line x1={480} y1={48} x2={480} y2={400} stroke={LINE} strokeWidth="1" strokeDasharray="3 3" />

      <Node x={40} y={170} w={160} h={60} title="Indian Investors" sub="via OPI / LRS" />
      <Arrow x1={200} y1={200} x2={280} y2={200} bronze />

      <Node x={280} y={120} w={160} h={50} title="CAWT FME" variant="fill-ink" />
      <Node x={280} y={190} w={160} h={50} title="IFSC Fund" variant="fill-bronze" />

      <Arrow x1={360} y1={170} x2={360} y2={190} dashed />
      <Arrow x1={440} y1={215} x2={520} y2={215} bronze />

      <Node x={520} y={140} w={160} h={45} title="VCC / Expert Funds" />
      <Node x={520} y={200} w={160} h={45} title="Listed / unlisted equity" />
      <Node x={520} y={260} w={160} h={45} title="Debt + derivatives" />

      <text x={360} y={350} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
        Broker- and custodian-agnostic. Multi-currency operation.
      </text>
    </Frame>
  );
}

// =================================================================
// 6. TPFM Platform — External Manager → CAWT FME → Scheme
// =================================================================

export function DiagramTpfm() {
  return (
    <Frame viewBox="0 0 900 380">
      {/* Left column */}
      <Node x={30} y={150} w={170} h={80} title="External Manager" sub="Home-state regulated" />

      {/* Arrow + label between left and center */}
      <Arrow x1={200} y1={190} x2={330} y2={190} bronze />
      <text x={265} y={178} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
        Platform Agreement
      </text>

      {/* Center column */}
      <Node x={330} y={150} w={170} h={80} title="CAWT FME" sub="IFSCA-licensed" variant="fill-ink" />

      {/* Arrow + label between center and right */}
      <Arrow x1={500} y1={190} x2={630} y2={190} bronze />
      <text x={565} y={178} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
        Scheme launch
      </text>

      {/* Right column — 3 stacked outputs, each with its own arrow from center */}
      <Node x={630} y={70} w={230} h={55} title="IFSC AIF Scheme" variant="fill-bronze" />
      <Node x={630} y={165} w={230} h={55} title="Investor onboarding" variant="outline" />
      <Node x={630} y={260} w={230} h={55} title="Portfolio managed" sub="by external manager" variant="outline" />

      {/* Branching arrows from CAWT FME edge to each right node */}
      <line x1={605} y1={190} x2={605} y2={97} stroke={INK} strokeOpacity="0.25" strokeWidth="1" />
      <line x1={605} y1={97} x2={628} y2={97} stroke={INK} strokeOpacity="0.25" strokeWidth="1" />
      <line x1={605} y1={190} x2={605} y2={287} stroke={INK} strokeOpacity="0.25" strokeWidth="1" />
      <line x1={605} y1={287} x2={628} y2={287} stroke={INK} strokeOpacity="0.25" strokeWidth="1" />

      <text x={450} y={350} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
        Regulatory liability retained by CAWT FME · External manager retains investment-decision authority
      </text>
    </Frame>
  );
}

// =================================================================
// 7. Wealth Lifecycle (4 stage horizontal)
// =================================================================

export function DiagramLifecycle() {
  const steps = [
    { title: "Create", body: "Building wealth" },
    { title: "Preserve", body: "Protecting the corpus" },
    { title: "Govern", body: "Family alignment" },
    { title: "Transfer", body: "Next-generation succession" },
  ];
  return (
    <Frame viewBox="0 0 720 240">
      {steps.map((s, i) => {
        const x = 60 + i * 160;
        return (
          <g key={i}>
            <circle cx={x + 50} cy={70} r="32" fill={i === 0 ? INK : "#FAF7F2"} stroke={BRONZE} strokeWidth="1.5" />
            <text
              x={x + 50}
              y={76}
              fontFamily="Fraunces, serif"
              fontSize="22"
              fontWeight="600"
              fill={i === 0 ? "#FAF7F2" : BRONZE}
              textAnchor="middle"
            >
              0{i + 1}
            </text>
            <text x={x + 50} y={140} fontFamily="Inter, sans-serif" fontSize="15" fontWeight="600" fill={INK} textAnchor="middle">
              {s.title}
            </text>
            <text x={x + 50} y={160} fontFamily="Inter, sans-serif" fontSize="11" fill={MUTED} textAnchor="middle">
              {s.body}
            </text>
            {i < steps.length - 1 && (
              <line x1={x + 90} y1={70} x2={x + 170} y2={70} stroke={BRONZE} strokeWidth="1.2" opacity="0.6" />
            )}
          </g>
        );
      })}
    </Frame>
  );
}

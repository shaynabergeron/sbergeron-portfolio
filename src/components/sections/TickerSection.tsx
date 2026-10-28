export function TickerSection() {
  return (
    <div className="ticker" id="ticker" aria-label="Specialties">
      <div className="container ticker-inner">
        <span className="ticker-label mono">THE SWEET SPOT</span>
        <div className="ticker-items">
          {["USER EXPERIENCE", "CLEAN CODE", "FULL-STACK THINKING", "INCLUSIVE DESIGN"].map((label) => (
            <span key={label}><b aria-hidden="true">✳</b>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

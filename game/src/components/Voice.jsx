// Renders diary-voice copy where *asterisks* mark interior asides (italics).
export default function Voice({ text }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') && p.endsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : p
      )}
    </>
  );
}

export default function ErroMsg({ erro }: { erro: string | boolean }) {
  if (!erro) return null;
  return <p className="error-message">{erro}</p>;
}

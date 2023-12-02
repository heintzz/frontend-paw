export default async function AuthLayout({ children }) {
  return (
    <div className="bg-base-white grid place-items-center w-screen h-screen px-2">{children}</div>
  );
}

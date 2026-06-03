import Script from "next/script";
import { APP_MARKUP } from "./markup";

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: APP_MARKUP }} />
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
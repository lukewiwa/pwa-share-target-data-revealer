import { useMemo } from "react";
import ParamView from "./components/ParamView";
import pwaContextScreen from "./assets/pwa_install_screen_context.png";
import pwaConfirmScreen from "./assets/pwa_install_screen_confirm.png";
import "./App.css";

function App() {
  const params = useMemo(() => {
    const currentUrl = new URL(location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    const result: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      result[key] = value;
    }
    return result;
  }, []);

  const emptyParams = Object.keys(params).length === 0;

  return (
    <div className="container mx-auto flex flex-col items-stretch align-center min-w-min max-w-5xl">
      <div className="bg-white flex flex-col items-stretch align-center p-10 m-8 border border-teal-500 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 self-center text-teal-700">
          PWA Share Target Data Revealer
        </h1>
        {emptyParams ? (
          <div className="text-teal-800">
            Install this app as a PWA to your android phone and then share from
            any other app to PWA Share Target Revealer to show the data
            transferred.
            <div className="install-images">
              <img src={pwaContextScreen} className="p-4" alt="Install step 1" />
              <img src={pwaConfirmScreen} className="p-4" alt="Install step 2" />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl text-teal-700 my-3">Parameter Values</h2>
            {Object.entries(params).map(([key, value]) => (
              <ParamView key={key} paramKey={key} paramValue={value} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

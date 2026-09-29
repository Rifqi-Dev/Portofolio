import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Book from "./components/book/Book";
import { BookProvider } from "./components/book/BookContext";
import StarField from "./components/StarField";
import BookIntro, { DISSOLVE_MS } from "./components/book/BookIntro";
import { LANDSCAPE_SHORT_QUERY } from "./components/book/useIsLandscapeShort";
import spaceBackground from "./components/book/assets/space-background.png";
import Loading from "./components/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

// Portrait phones get the loading bar instead of the intro video. Sideways
// phones show the book (scaled to fit), so they play the video too.
const isMobileViewport = () =>
  window.matchMedia("(max-width: 767px)").matches &&
  !window.matchMedia(LANDSCAPE_SHORT_QUERY).matches;
const LOADING_MS = 3500; // Loading.js bar (2.8 s) + its 0.6 s fade-out

function App() {
  // "playing" -> intro video on screen; "fading" -> book fades in over the
  // video's last frame; "done" -> intro unmounted. Phones skip the video
  // (the landscape book animation doesn't fit a portrait screen) and show
  // the "loading" progress bar instead, then go straight to "done".
  const [intro, setIntro] = useState(() => (isMobileViewport() ? "loading" : "playing"));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = "Rifqi Dev";
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    if (intro !== "loading") return undefined;
    // Loading.js runs its own ~2.8 s bar and fades itself out at 98%.
    const timer = setTimeout(() => {
      setIntro("done");
      setVisible(true);
    }, LOADING_MS);
    return () => clearTimeout(timer);
  }, [intro]);

  const finishIntro = useCallback(() => {
    setIntro((state) => (state === "playing" ? "fading" : state));
  }, []);

  // The intro video can't be shown (Safari/iOS, reduced motion, autoplay
  // blocked, decode error): show the loading bar instead, like portrait phones.
  const introUnavailable = useCallback(() => {
    setIntro((state) => (state === "playing" ? "loading" : state));
  }, []);

  useEffect(() => {
    if (intro !== "fading") return undefined;
    // Page starts resolving just after the intro starts to dissolve; the
    // overlay is removed once its dissolve has finished.
    const show = setTimeout(() => setVisible(true), 150);
    const unmount = setTimeout(() => setIntro("done"), DISSOLVE_MS + 200);
    return () => {
      clearTimeout(show);
      clearTimeout(unmount);
    };
  }, [intro]);

  return (
    <div className="App text-archive-text bg-space min-h-screen font-inter">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5,11,26,0.55), rgba(5,11,26,0.85)), url(${spaceBackground})`,
        }}
      />
      <StarField />
      {intro === "loading" && (
        <div className="relative z-10">
          <Loading />
        </div>
      )}
      {(intro === "playing" || intro === "fading") && (
        <BookIntro
          onFinish={finishIntro}
          onUnavailable={introUnavailable}
          fading={intro === "fading"}
        />
      )}
      <div
        className={`transition-opacity duration-700 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {intro !== "playing" && intro !== "loading" && (
          <BookProvider>
            <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-0 py-0 md:px-16 md:py-10 [@media(max-height:500px)]:py-2">
              <Book />
            </main>
          </BookProvider>
        )}
      </div>
    </div>
  );
}

export default App;

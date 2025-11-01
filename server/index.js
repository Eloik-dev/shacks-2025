import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useContext, createContext, useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const logoDark = "/assets/logo-dark-pX2395Y0.svg";
const logoLight = "/assets/logo-light-CVbx2LBR.svg";
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-16 min-h-0", children: [
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center gap-9", children: /* @__PURE__ */ jsxs("div", { className: "w-[500px] max-w-[100vw] p-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: logoLight,
          alt: "React Router",
          className: "block w-full dark:hidden"
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: logoDark,
          alt: "React Router",
          className: "hidden w-full dark:block"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[300px] w-full space-y-6 px-4", children: /* @__PURE__ */ jsxs("nav", { className: "rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "leading-6 text-gray-700 dark:text-gray-200 text-center", children: "What's next?" }),
      /* @__PURE__ */ jsx("ul", { children: resources.map(({ href, text, icon }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "a",
        {
          className: "group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500",
          href,
          target: "_blank",
          rel: "noreferrer",
          children: [
            icon,
            text
          ]
        }
      ) }, href)) })
    ] }) })
  ] }) });
}
const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      }
    )
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 24 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z",
            strokeWidth: "1.5"
          }
        )
      }
    )
  }
];
function meta$1({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const CaptchaWrapper = ({ children }) => {
  const { levelCount, currentLevel, currentDescription } = useContext(MinigamesContext);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-screen", children: /* @__PURE__ */ jsxs("div", { className: "w-1/2 p-[5px] relative padding border rounded-lg shadow-md bg-white overflow-hidden font-sans", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-3 py-2 bg-gray-100 border-b", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-700", children: currentDescription }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-gray-700", children: [
        currentLevel + 1,
        " / ",
        levelCount
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "", children }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-3 py-2 border-t bg-gray-100", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "reCAPTCHA" }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-2 text-[10px] text-gray-400", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gray-600 underline", children: "Privacy" }),
        /* @__PURE__ */ jsx("span", { children: "•" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-gray-600 underline", children: "Terms" })
      ] })
    ] })
  ] }) });
};
const MinigamesContext = createContext({
  currentDescription: "",
  updateDescription: () => {
  },
  currentLevel: 0,
  nextLevel: () => {
  },
  capchaSolved: false,
  setCapchaSolved: () => {
  },
  resetCapcha: () => {
  },
  levelCount: 0,
  victory: false
});
const MinigamesProvider = ({ levels }) => {
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [capchaSolved, setCapchaSolved] = useState(false);
  const [levelCount, setLevelCount] = useState(levels.length);
  const [victory, setVictory] = useState(false);
  useEffect(() => {
    setLevelCount(levels.length);
  }, [levels]);
  const updateDescription = (description) => {
    setCurrentDescription(description);
  };
  const nextLevel = () => {
    setVictory(true);
    setTimeout(() => {
      if (currentLevel < levels.length) {
        setCurrentLevel(currentLevel + 1);
        setCapchaSolved(false);
      } else {
        setCapchaSolved(true);
      }
      setVictory(false);
    }, 1e3);
  };
  const resetCapcha = () => {
    setCapchaSolved(false);
    setVictory(false);
  };
  return /* @__PURE__ */ jsx(MinigamesContext.Provider, { value: {
    currentDescription,
    updateDescription,
    currentLevel,
    nextLevel,
    capchaSolved,
    setCapchaSolved,
    resetCapcha,
    levelCount,
    victory
  }, children: /* @__PURE__ */ jsx(CaptchaWrapper, { children: levels[currentLevel] }) });
};
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const initialBoard = Array(9).fill(null);
const Tictacto = () => {
  const { updateDescription } = useContext(MinigamesContext);
  const [board, setBoard] = React.useState(initialBoard);
  const [message, setMessage] = React.useState(
    "À vous de jouer (X)"
  );
  const [isUserTurn, setIsUserTurn] = React.useState(true);
  const [gameOver, setGameOver] = React.useState(false);
  const [winningLine, setWinningLine] = React.useState(null);
  const [destroyed, setDestroyed] = React.useState(false);
  const [rebuilding, setRebuilding] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [disintegrateLine, setDisintegrateLine] = React.useState(false);
  const [lossCount, setLossCount] = React.useState(0);
  const [blocked, setBlocked] = React.useState(false);
  const countedLossRef = React.useRef(false);
  const [keySnapping, setKeySnapping] = React.useState(false);
  const lockRef = React.useRef(null);
  const keyRef = React.useRef(null);
  const draggingRef = React.useRef(false);
  const dragOffset = React.useRef({ dx: 0, dy: 0 });
  const [keyPos, setKeyPos] = React.useState({ x: 40, y: 400 });
  const [cellVars, setCellVars] = React.useState(
    () => new Array(9).fill(0).map(() => ({ tx: 0, ty: 0, rot: 0, delay: 0 }))
  );
  useEffect(() => {
    updateDescription("Gagnez au Tic-Tac-Toe pour prouver que vous êtes humain.");
  }, [updateDescription]);
  function checkWinner(b) {
    for (const [a, c, d] of WIN_LINES) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    }
    if (b.every((x) => x !== null)) return "draw";
    return null;
  }
  function findWinningLine(b) {
    for (const line of WIN_LINES) {
      const [a, c, d] = line;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return line;
    }
    return null;
  }
  function makeComputerMove(currentBoard) {
    if (gameOver || blocked) return;
    const free = currentBoard.map((v, i) => v === null ? i : -1).filter((i) => i !== -1);
    if (free.length === 0) return;
    for (const idx of free) {
      const probe = [...currentBoard];
      probe[idx] = "O";
      if (checkWinner(probe) === "O") {
        playComputerMove(idx);
        return;
      }
    }
    for (const idx of free) {
      const probe = [...currentBoard];
      probe[idx] = "X";
      if (checkWinner(probe) === "X") {
        playComputerMove(idx);
        return;
      }
    }
    if (currentBoard[4] === null) {
      playComputerMove(4);
      return;
    }
    const corners = [0, 2, 6, 8].filter((i) => currentBoard[i] === null);
    if (corners.length > 0) {
      playComputerMove(corners[Math.floor(Math.random() * corners.length)]);
      return;
    }
    const sides = [1, 3, 5, 7].filter((i) => currentBoard[i] === null);
    if (sides.length > 0) {
      playComputerMove(sides[Math.floor(Math.random() * sides.length)]);
      return;
    }
    playComputerMove(free[Math.floor(Math.random() * free.length)]);
  }
  function playComputerMove(choice) {
    const delay = 80;
    setTimeout(() => {
      const next = (prevBoard) => {
        const copy = [...prevBoard];
        if (copy[choice] !== null) return copy;
        copy[choice] = "O";
        return copy;
      };
      setBoard((prev) => {
        const nb = next(prev);
        const result = checkWinner(nb);
        if (result === "O") {
          setWinningLine(findWinningLine(nb));
          if (!countedLossRef.current) {
            countedLossRef.current = true;
            setLossCount((c) => {
              const nc = c + 1;
              if (nc >= 3) {
                setBlocked(true);
              }
              return nc;
            });
            if (typeof window !== "undefined") {
              const margin = 80;
              const maxX = Math.max(80, window.innerWidth - margin - 72);
              const maxY = Math.max(120, window.innerHeight - margin - 44);
              const rx = Math.floor(margin + Math.random() * (maxX - margin));
              const ry = Math.floor(margin + Math.random() * (maxY - margin));
              setKeyPos({ x: rx, y: ry });
            }
          }
          setMessage("PERDANT");
          setGameOver(true);
          setTimeout(() => {
            setDisintegrateLine(true);
            setCellVars(generateTransforms());
            setDestroyed(true);
            setTimeout(() => {
              setDestroyed(false);
              setDisintegrateLine(false);
              setHidden(true);
              setWinningLine(null);
            }, 900);
          }, 700);
        } else if (result === "draw") {
          setWinningLine(null);
          setMessage("Match nul.");
          setGameOver(true);
        } else {
          setMessage("À vous de jouer (X)");
          setIsUserTurn(true);
        }
        return nb;
      });
    }, delay);
  }
  function generateTransforms() {
    return new Array(9).fill(0).map(() => {
      const tx = Math.round((Math.random() - 0.5) * 800);
      const ty = Math.round((Math.random() - 0.5) * 600);
      const rot = Math.round((Math.random() - 0.5) * 720);
      const delay = Math.round(Math.random() * 200);
      return { tx, ty, rot, delay };
    });
  }
  function handleUserClick(idx) {
    if (blocked || !isUserTurn || gameOver) return;
    if (board[idx] !== null) return;
    const next = [...board];
    next[idx] = "X";
    setBoard(next);
    setIsUserTurn(false);
    const result = checkWinner(next);
    if (result === "X") {
      setWinningLine(findWinningLine(next));
      setMessage("Vous avez gagné !");
      setGameOver(true);
      return;
    }
    if (result === "draw") {
      setWinningLine(null);
      setMessage("Match nul.");
      setGameOver(true);
      return;
    }
    setMessage("L'ordinateur réfléchit...");
    makeComputerMove(next);
  }
  function reset() {
    if (hidden) {
      countedLossRef.current = false;
      setKeySnapping(false);
      setHidden(false);
      const vars = generateTransforms();
      setCellVars(vars);
      setBoard(initialBoard.slice().map(() => null));
      setRebuilding(true);
      setTimeout(() => {
        setRebuilding(false);
        setGameOver(false);
        setIsUserTurn(true);
        setMessage("À vous de jouer (X)");
        setBoard(initialBoard.slice());
      }, 900);
      return;
    }
    setBoard(initialBoard.slice());
    setGameOver(false);
    setIsUserTurn(true);
    setMessage("À vous de jouer (X)");
    setWinningLine(null);
    countedLossRef.current = false;
    if (blocked) {
      setBlocked(false);
      setLossCount(0);
      setHidden(false);
      setKeySnapping(false);
    }
  }
  React.useEffect(() => {
    setIsUserTurn(true);
    setMessage("À vous de jouer (X)");
  }, []);
  React.useEffect(() => {
    setKeyPos({ x: 40, y: window.innerHeight - 140 });
    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
      window.removeEventListener("touchmove", onWindowTouchMove);
      window.removeEventListener("touchend", onWindowMouseUp);
    };
  }, []);
  function onWindowMouseMove(e) {
    if (!draggingRef.current) return;
    const dx = dragOffset.current.dx;
    const dy = dragOffset.current.dy;
    setKeyPos({ x: e.clientX - dx, y: e.clientY - dy });
  }
  function onWindowTouchMove(e) {
    if (!draggingRef.current) return;
    const t = e.touches[0];
    const dx = dragOffset.current.dx;
    const dy = dragOffset.current.dy;
    setKeyPos({ x: t.clientX - dx, y: t.clientY - dy });
  }
  function onWindowMouseUp(e) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    window.removeEventListener("mousemove", onWindowMouseMove);
    window.removeEventListener("mouseup", onWindowMouseUp);
    window.removeEventListener("touchmove", onWindowTouchMove);
    window.removeEventListener("touchend", onWindowMouseUp);
    if (lockRef.current && keyRef.current) {
      const lockRect = lockRef.current.getBoundingClientRect();
      const keyRect = keyRef.current.getBoundingClientRect();
      const keyCenterX = keyRect.left + keyRect.width / 2;
      const keyCenterY = keyRect.top + keyRect.height / 2;
      if (keyCenterX >= lockRect.left && keyCenterX <= lockRect.right && keyCenterY >= lockRect.top && keyCenterY <= lockRect.bottom) {
        const lockCenterX = lockRect.left + lockRect.width / 2 - keyRect.width / 2;
        const lockCenterY = lockRect.top + lockRect.height / 2 - keyRect.height / 2;
        setKeySnapping(true);
        setKeyPos({ x: lockCenterX, y: lockCenterY });
        setTimeout(() => {
          setBlocked(false);
          setLossCount(0);
          countedLossRef.current = false;
          setHidden(false);
          setMessage("À vous de jouer (X)");
          setIsUserTurn(true);
          setTimeout(() => setKeySnapping(false), 200);
        }, 380);
      }
    }
  }
  function startDragFromEvent(e) {
    if (!blocked) return;
    let clientX = 0;
    let clientY = 0;
    if ("touches" in e && e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    draggingRef.current = true;
    dragOffset.current = { dx: clientX - keyPos.x, dy: clientY - keyPos.y };
    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    window.addEventListener("touchmove", onWindowTouchMove, { passive: false });
    window.addEventListener("touchend", onWindowMouseUp);
  }
  const CELL_SIZE = 100;
  const GAP = 8;
  const TOTAL = 3 * CELL_SIZE + 2 * GAP;
  const styles = {
    // Full-page dark container scoped to this component so only the TicTacToe page looks black
    container: {
      minHeight: "50vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      boxSizing: "border-box"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: GAP,
      marginTop: 12,
      width: TOTAL,
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative"
    },
    cell: {
      width: CELL_SIZE,
      height: CELL_SIZE,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 36,
      fontWeight: 800,
      background: "linear-gradient(135deg,#0f172a, #001f3f)",
      border: "2px solid rgba(255,255,255,0.08)",
      borderRadius: 8,
      cursor: "pointer",
      userSelect: "none",
      color: "#fff"
    },
    footer: { marginTop: 16 },
    small: { fontSize: 14, color: "#ddd" }
  };
  const STRIKE_THICK = 6;
  function getStrikeStyle(line) {
    if (!line) return { display: "none" };
    const [a, , c] = line;
    if (line[0] % 3 === 0 && line[1] % 3 === 1 && line[2] % 3 === 2) {
      const row = Math.floor(line[0] / 3);
      const top = row * (CELL_SIZE + GAP) + CELL_SIZE / 2 - STRIKE_THICK / 2;
      return {
        position: "absolute",
        left: 0,
        top,
        width: TOTAL,
        height: STRIKE_THICK,
        background: "#00ffcc",
        borderRadius: STRIKE_THICK / 2,
        transform: "none",
        zIndex: 2
      };
    }
    if (line[0] < 3 && line[1] < 6 && line[2] < 9 && line[1] - line[0] === 3) {
      const col = line[0] % 3;
      const left = col * (CELL_SIZE + GAP) + CELL_SIZE / 2 - STRIKE_THICK / 2;
      return {
        position: "absolute",
        left,
        top: 0,
        width: STRIKE_THICK,
        height: TOTAL,
        background: "#00ffcc",
        borderRadius: STRIKE_THICK / 2,
        zIndex: 2
      };
    }
    if (line[0] === 0 && line[1] === 4 && line[2] === 8) {
      return {
        position: "absolute",
        left: (TOTAL - TOTAL * 1.05) / 2,
        top: TOTAL / 2 - STRIKE_THICK / 2,
        width: TOTAL * 1.05,
        height: STRIKE_THICK,
        background: "#ffe66d",
        transform: "rotate(45deg)",
        transformOrigin: "center",
        zIndex: 2
      };
    }
    if (line[0] === 2 && line[1] === 4 && line[2] === 6) {
      return {
        position: "absolute",
        left: (TOTAL - TOTAL * 1.05) / 2,
        top: TOTAL / 2 - STRIKE_THICK / 2,
        width: TOTAL * 1.05,
        height: STRIKE_THICK,
        background: "#ffe66d",
        transform: "rotate(-45deg)",
        transformOrigin: "center",
        zIndex: 2
      };
    }
    return { display: "none" };
  }
  return /* @__PURE__ */ jsxs("div", { style: styles.container, "aria-live": "polite", children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsx("h2", { style: { marginBottom: 6, fontSize: 36, letterSpacing: 2 }, children: "Tictacto" }),
      /* @__PURE__ */ jsx("div", { style: { color: "#ff6b6b", fontWeight: 700, marginLeft: 8 }, children: lossCount > 0 ? `Défaites: ${lossCount}/3` : null })
    ] }),
    message === "PERDANT" ? /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 12 }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          disabled: true,
          style: {
            background: "linear-gradient(90deg,#ff2d2d,#ff6b6b)",
            color: "#fff",
            fontSize: 44,
            fontWeight: 900,
            padding: "12px 24px",
            borderRadius: 10,
            border: "none",
            letterSpacing: 2
          },
          children: "PERDANT"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: reset,
          style: {
            background: "linear-gradient(90deg,#ff2fb1,#00fff0)",
            color: "#001014",
            fontSize: 18,
            fontWeight: 800,
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)"
          },
          children: "Recommencer"
        }
      )
    ] }) : /* @__PURE__ */ jsx("p", { style: styles.small, children: message }),
    /* @__PURE__ */ jsx("style", { children: `
                        .tictacto-grid { position: relative; }
                        .tictacto-cell { will-change: transform, opacity; }
                        .tictacto-cell.explode { animation: explode 700ms forwards; animation-delay: var(--delay); }
                        .tictacto-cell.assemble { animation: assemble 700ms forwards; animation-delay: var(--delay); }
                        .tictacto-strike.disintegrate { animation: disintegrate 900ms forwards; }
                        @keyframes explode {
                            to { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
                        }
                        @keyframes assemble {
                            from { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
                            to { transform: none; opacity: 1; }
                        }
                        @keyframes disintegrate {
                            0% { opacity: 1; filter: none; transform: scaleX(1); }
                            40% { opacity: 0.8; filter: blur(2px) hue-rotate(10deg); transform: scaleX(0.9) translateY(-4px); }
                            100% { opacity: 0; transform: scaleX(0.2) translateY(-30px) rotate(-8deg); filter: blur(6px); }
                        }
                    ` }),
    !hidden && /* @__PURE__ */ jsxs("div", { className: "tictacto-grid", style: styles.grid, children: [
      winningLine && /* @__PURE__ */ jsx(
        "div",
        {
          className: `tictacto-strike ${disintegrateLine ? "disintegrate" : ""}`,
          style: getStrikeStyle(winningLine)
        }
      ),
      board.map((v, i) => {
        const isWinning = !!winningLine && winningLine.includes(i);
        let cellBg;
        let textColor = "#fff";
        let textShadow = "none";
        if (v === null) {
          cellBg = "linear-gradient(135deg,#071024,#00101f)";
          textColor = "#fff";
        } else if (v === "X") {
          cellBg = "linear-gradient(135deg,#00fff0,#00c2ff)";
          textColor = "#001014";
          textShadow = "0 0 12px rgba(0,255,240,0.6)";
        } else {
          cellBg = "linear-gradient(135deg,#ff2fb1,#ff7ae0)";
          textColor = "#fff";
          textShadow = "0 0 12px rgba(255,47,177,0.6)";
        }
        const vars = cellVars[i] || { tx: 0, ty: 0, rot: 0, delay: 0 };
        const cssVars = {
          ["--tx"]: `${vars.tx}px`,
          ["--ty"]: `${vars.ty}px`,
          ["--rot"]: `${vars.rot}deg`,
          ["--delay"]: `${vars.delay}ms`
        };
        const className = `tictacto-cell ${destroyed ? "explode" : rebuilding ? "assemble" : ""}`;
        return /* @__PURE__ */ jsx(
          "div",
          {
            role: "button",
            "aria-label": `case ${i + 1}`,
            onClick: () => handleUserClick(i),
            className,
            style: {
              ...styles.cell,
              ...cssVars,
              background: cellBg,
              color: textColor,
              textShadow,
              cursor: gameOver || !isUserTurn || v !== null ? "not-allowed" : "pointer",
              opacity: 1,
              boxShadow: isWinning ? "0 0 18px rgba(255,230,109,0.45), inset 0 0 0 3px rgba(255,230,109,0.12)" : "0 6px 18px rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: v
          },
          i
        );
      })
    ] }),
    hidden && message !== "PERDANT" && /* @__PURE__ */ jsx("div", { style: { position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200 }, children: /* @__PURE__ */ jsx("button", { onClick: reset, style: { padding: "16px 24px", fontSize: 20, borderRadius: 10, background: "linear-gradient(90deg,#ff2fb1,#00fff0)", border: "none", color: "#001014", fontWeight: 800, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }, children: "Recommencer" }) }),
    blocked && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 2e3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 18,
            color: "#fff",
            padding: 24,
            textAlign: "center"
          },
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              ref: lockRef,
              style: {
                width: 240,
                height: 240,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                boxShadow: "0 20px 60px rgba(0,0,0,0.7), inset 0 2px 6px rgba(255,255,255,0.02)"
              },
              children: [
                /* @__PURE__ */ jsx("div", { style: { fontSize: 96, lineHeight: 1 }, children: "🔒" }),
                /* @__PURE__ */ jsx("div", { style: { marginTop: 8, fontSize: 18, fontWeight: 700 }, children: "Verrouillé" }),
                /* @__PURE__ */ jsx("div", { style: { marginTop: 6, fontSize: 14, color: "#ffb3b3" }, children: "Glissez la clé sur le cadenas pour déverrouiller" }),
                /* @__PURE__ */ jsxs("div", { style: { marginTop: 10, fontSize: 13, color: "#ff6b6b", fontWeight: 800 }, children: [
                  "Défaites: ",
                  lossCount,
                  "/3"
                ] })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: keyRef,
          onMouseDown: (e) => startDragFromEvent(e),
          onTouchStart: (e) => startDragFromEvent(e),
          style: {
            position: "fixed",
            left: keyPos.x,
            top: keyPos.y,
            zIndex: 2100,
            width: 72,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            background: "linear-gradient(90deg,#ffd36b,#ff8fb1)",
            borderRadius: 10,
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
            userSelect: "none",
            touchAction: "none",
            transition: keySnapping ? "left 360ms cubic-bezier(.2,.9,.2,1), top 360ms cubic-bezier(.2,.9,.2,1), transform 260ms ease" : "none",
            transform: keySnapping ? "scale(1.08)" : "none"
          },
          children: "🔑"
        }
      )
    ] }),
    !hidden && /* @__PURE__ */ jsx("div", { style: styles.footer, children: gameOver && winningLine && board[winningLine[0]] === "X" ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: { color: "#0a7f3d", fontWeight: 700, marginBottom: 8 }, children: "🎉 Succès — vous avez battu l'ordinateur !" }),
      /* @__PURE__ */ jsx("button", { onClick: reset, style: { padding: "8px 12px", borderRadius: 6 }, children: "Rejouer" })
    ] }) : gameOver && message !== "PERDANT" ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { onClick: reset, style: { padding: "8px 12px", borderRadius: 6 }, children: "Recommencer" }) }) : null })
  ] });
};
const Capcha = () => {
  return /* @__PURE__ */ jsx(MinigamesProvider, { levels: [/* @__PURE__ */ jsx(Tictacto, {})] });
};
function meta({}) {
  return [{
    title: "Capchat"
  }, {
    name: "description",
    content: "Veuillez compléter le capchat"
  }];
}
const capchat = UNSAFE_withComponentProps(function Capchat() {
  return /* @__PURE__ */ jsx(Capcha, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: capchat,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BwxNzArz.js", "imports": ["/assets/chunk-UIGDSWPH-DcDWgLby.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-D6gJASaq.js", "imports": ["/assets/chunk-UIGDSWPH-DcDWgLby.js"], "css": ["/assets/root-CZZDW_4A.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home/home": { "id": "routes/home/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-C9YEFRhN.js", "imports": ["/assets/chunk-UIGDSWPH-DcDWgLby.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/capchat/capchat": { "id": "routes/capchat/capchat", "parentId": "root", "path": "capchat", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/capchat-CKrA6EO_.js", "imports": ["/assets/chunk-UIGDSWPH-DcDWgLby.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-94b8300a.js", "version": "94b8300a", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home/home": {
    id: "routes/home/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/capchat/capchat": {
    id: "routes/capchat/capchat",
    parentId: "root",
    path: "capchat",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

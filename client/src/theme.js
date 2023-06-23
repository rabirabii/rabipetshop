// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", // manually adjusted
    1100: "#005f32",
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // manually adjusted
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
    1000: "#1ba76d",
    1100: "#085635",
    1200: "#0a754a",
  },
  secondary: {
    // yellow
    50: "#debfdf", // manually adjusted
    100: "#8acccb",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
    1000: "#27a5a9",
    1100: "#81cacf",
    1200: "#27a5a9",
  },
  green: {
    100: "#ccffcc",
    200: "#99ff99",
    300: "#66ff66",
    400: "#33ff33",
    500: "#00ff00",
    600: "#3e9839",
    700: "#009900",
    800: "#006600",
    900: "#003300",
    1000: "#933998",
  },
  gray: {
    100: "#e8f5f5",
    200: "#d0ebea",
    300: "#b9e0e0",
    400: "#a1d6d5",
    500: "#8acccb",
    600: "#6ea3a2",
    700: "#537a7a",
    800: "#375251",
    900: "#1c2929",
  },
};

//   Function for change theme color
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reverseTokens;
}
export const tokensLight = reverseTokens(tokensDark);

//  MUI theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Pallete values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[700],
            },
          }
        : {
            // Pallete values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.secondary[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[100],
            },
          }),
    },
    typography: {
      fontFamily: ["Raleway", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Raleway", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// Theme configuration for Apex Circle
// Light and Dark mode variants

export type ThemeMode = "light" | "dark";

export type Theme = {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };

  textColor: {
    primary: string;
    secondary: string;
    tersiary: string;
    muted: string;
  };

  borderColor: {
    primary: string;
    secondary: string;
  };

  alert: {
    success: {
      text: string;
      background: string;
      border: string;
      icon: string;
    };
    warning: {
      text: string;
      background: string;
      border: string;
      icon: string;
    };
    error: {
      text: string;
      background: string;
      border: string;
      icon: string;
    };
    info: {
      text: string;
      background: string;
      border: string;
      icon: string;
    };
  };

  fontFamily: {
    primary: string;
    secondary: string;
  };
};
//
export const lightTheme: Theme = {
  background: {
    primary: "#FFFFFF",
    secondary: "#F5F5F5",
    tertiary: "#E0E0E0",
  },
  textColor: {
    primary: "#333333",
    secondary: "#666666",
    tersiary: "#306ee8",
    muted: "#999999",
  },
  borderColor: {
    primary: "#CCCCCC",
    secondary: "#EEEEEE",
  },
  alert: {
    success: {
      text: "#155724",
      background: "#D4EDDA",
      border: "#C3E6CB",
      icon: "#28A745",
    },
    warning: {
      text: "#856404",
      background: "#FFF3CD",
      border: "#FFEEBA",
      icon: "#FFC107",
    },
    error: {
      text: "#721C24",
      background: "#F8D7DA",
      border: "#F5C6CB",
      icon: "#DC3545",
    },
    info: {
      text: "#0D47A1",
      background: "#D1E9F0",
      border: "#B3E5FCB",
      icon: "#2196F3",
    },
  },
  fontFamily: {
    primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    secondary: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
};

export const darkTheme: Theme = {
  background: {
    primary: "#FFFFFF",
    secondary: "#f6f6f8",
    tertiary: "#dbeafe",
  },
  textColor: {
    primary: "#1e293b",
    secondary: "#738196",
    tersiary: "#306ee8",
    muted: "#777777",
  },
  borderColor: {
    primary: "#e2e8f0",
    secondary: "#444444",
  },
  alert: {
    success: {
      text: "#D4EDDA",
      background: "#155724",
      border: "#C3E6CB",
      icon: "#28A745",
    },
    warning: {
      text: "#FFF3CD",
      background: "#856404",
      border: "#FFEEBA",
      icon: "#FFC107",
    },
    error: {
      text: "#F8D7DA",
      background: "#721C24",
      border: "#F5C6CB",
      icon: "#DC3545",
    },
    info: {
      text: "#D1E9F0",
      background: "#0D47A1",
      border: "#B3E5FCB",
      icon: "#2196F3",
    },
  },
  fontFamily: {
    primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    secondary: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
};

// Theme toggle utility
export function getTheme(mode: ThemeMode): Theme {
  return mode === "dark" ? darkTheme : lightTheme;
}

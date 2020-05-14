export interface EventColor {
  primary: string;
  secondary: string;
}

export interface EventColors {
  disabled: EventColor;
  reserved: EventColor;
  success: EventColor;
}

const EVENT_COLORS: EventColors = {
  disabled: {
    primary: '#8d8d8d',
    secondary: '#efefef',
  },
  reserved: {
    primary: '#870000',
    secondary: '#bf360c',
  },
  success: {
    primary: '#255d00',
    secondary: '#2e7d32',
  },
};

export { EVENT_COLORS };

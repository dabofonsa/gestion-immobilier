import '@mui/material';

export interface CustomTheme {
  // Add custom variables here like below:
  // status: {
  //   danger: string;
  // };
}

declare module '@mui/material' {
  interface Theme extends import('@mui/material').Theme, CustomTheme {}
  interface ThemeOptions
    extends import('@mui/material').ThemeOptions,
      CustomTheme {}
}

export type FlavorName = 'html' | 'tailwind' | 'material';

export interface Flavor {
  name: FlavorName;
  label: string;
  iconPath: string;
  color: string;
}

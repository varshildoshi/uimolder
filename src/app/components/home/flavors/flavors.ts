import { Component } from '@angular/core';

interface Flavor {
  id: number;
  label: string;
  badge: string;
  title: string;
  description: string;
  color: string;
  iconPath: string; // Add your SVG paths here
}

@Component({
  selector: 'app-flavors',
  imports: [],
  templateUrl: './flavors.html',
  styleUrl: './flavors.scss',
})
export class Flavors {

  size = 600;
  center = this.size / 2;
  // innerRadius = 180;
  // outerRadius = 230;
  innerRadius = 160;
  outerRadius = 260;
  startAngle = -60; // Narrower arc for 3 items
  endAngle = 60;
  activeIndex = 0; // Default to center (Tailwind)

  segments: Flavor[] = [
    {
      id: 0,
      label: 'HTML',
      badge: 'Vanilla Structure',
      title: 'Pure Semantic HTML',
      description: 'Clean, lightweight, and framework-agnostic code for maximum portability.',
      color: '#e34f26',
      iconPath: 'm3 2 1.578 17.824L12 22l7.467-2.175L21 2H3Zm14.049 6.048H9.075l.172 2.016h7.697l-.626 6.565-4.246 1.381-4.281-1.455-.288-2.932h2.024l.16 1.411 2.4.815 2.346-.763.297-3.005H7.416l-.562-6.05h10.412l-.217 2.017Z'
    },
    {
      id: 1,
      label: 'Tailwind',
      badge: 'Modern Utility',
      title: 'Tailwind CSS v4',
      description: 'Utility-first architecture with zero runtime overhead and rapid styling.',
      color: '#38bdf8',
      iconPath: 'M11.782 5.72a4.773 4.773 0 0 0-4.8 4.173 3.43 3.43 0 0 1 2.741-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.934-2.865 3.137-3.921-.969 1.379-2.44 2.207-4.259 1.231-1.253-.673-2.19-3.438-5.959-3.318ZM6.8 11.979A4.772 4.772 0 0 0 2 16.151a3.431 3.431 0 0 1 2.745-1.687c1.689 0 2.974 1.972 3.758 2.587a5.733 5.733 0 0 0 5.382.935c2-.638 2.933-2.865 3.137-3.921-.97 1.379-2.44 2.208-4.259 1.231-1.253-.673-2.19-3.443-5.963-3.317Z'
    },
    {
      id: 2,
      label: 'Material',
      badge: 'Enterprise UI',
      title: 'Angular Material',
      description: 'Robust, accessible components designed for high-end enterprise applications.',
      color: '#dd0031',
      iconPath: 'M12 2L3.8 4.9l1.2 10.9L12 21l7-5.2 1.2-10.9L12 2zm0 2l5.1 11.5h-1.9l-1-2.6H9.8l-1 2.6H6.9L12 4zm1.5 7.4L12 7.8l-1.5 3.6h3z'
    }
  ];

  get activeFlavor() {
    return this.segments[this.activeIndex];
  }

  get angleStep() {
    return (this.endAngle - this.startAngle) / this.segments.length;
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  // ... (keep your polarToCartesian and describeArcSegment methods)
  polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  describeArcSegment(start: number, end: number) {
    // These points define the outer arc (top of the box)
    const p1 = this.polarToCartesian(this.center, this.center, this.outerRadius, end);
    const p2 = this.polarToCartesian(this.center, this.center, this.outerRadius, start);

    // These points define the inner arc (bottom of the box)
    const p3 = this.polarToCartesian(this.center, this.center, this.innerRadius, start);
    const p4 = this.polarToCartesian(this.center, this.center, this.innerRadius, end);

    return `M ${p1.x} ${p1.y} 
          A ${this.outerRadius} ${this.outerRadius} 0 0 0 ${p2.x} ${p2.y} 
          L ${p3.x} ${p3.y} 
          A ${this.innerRadius} ${this.innerRadius} 0 0 1 ${p4.x} ${p4.y} Z`;
  }

  segmentPath(index: number) {
    const start = this.startAngle + index * this.angleStep;
    const end = start + this.angleStep;
    return this.describeArcSegment(start, end);
  }

  segmentMidAngle(index: number) {
    return this.startAngle + index * this.angleStep + this.angleStep / 2;
  }

}

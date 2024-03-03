import { Component, Input } from '@angular/core';

@Component({
  selector: 'up-icon',
  standalone: true,
  template: `<svg
    width="15px"
    height="15px"
    viewBox="0 0 24 24"
    fill="currentColor"
    x="128"
    y="128"
    role="img"
    style="display:inline-block;vertical-align:middle"
    xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2" d="M12 20V4m-7 7l7-7l7 7"/>
      </g>
    </svg>`,
  styles: `
    :host {
      display: inline-block;
    }
  `
})
export class UpIcon {

}

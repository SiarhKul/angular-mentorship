# Angular Material Icons Guide

## Setup

### 1. Install Angular Material
```bash
ng add @angular/material
```
This command will:
- Install Angular Material and Angular CDK
- Add the Material Icons font to your index.html
- Add a theme to your styles.css
- Add the necessary modules to your app.module.ts (for non-standalone components)

### 2. Import MatIconModule
For standalone components:
```typescript
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {}
```

For non-standalone components (app.module.ts):
```typescript
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatIconModule,
    // other modules
  ],
  // ...
})
export class AppModule {}
```

## Using Material Icons

### Basic Usage
```html
<mat-icon>home</mat-icon>
<mat-icon>search</mat-icon>
<mat-icon>menu</mat-icon>
```

### Icon Sets
Angular Material supports different icon sets:

1. **Material Icons (default)**
   ```html
   <mat-icon>home</mat-icon>
   ```

2. **Material Icons Outlined**
   ```html
   <mat-icon fontSet="material-icons-outlined">home</mat-icon>
   ```

3. **Material Icons Round**
   ```html
   <mat-icon fontSet="material-icons-round">home</mat-icon>
   ```

4. **Material Icons Sharp**
   ```html
   <mat-icon fontSet="material-icons-sharp">home</mat-icon>
   ```

5. **Material Icons Two Tone**
   ```html
   <mat-icon fontSet="material-icons-two-tone">home</mat-icon>
   ```

### Styling Icons

#### Size
```html
<mat-icon style="font-size: 24px;">home</mat-icon>
<mat-icon style="font-size: 36px;">home</mat-icon>
<mat-icon style="font-size: 48px;">home</mat-icon>
```

Or with CSS:
```css
.large-icon {
  font-size: 48px;
  height: 48px;
  width: 48px;
}
```

```html
<mat-icon class="large-icon">home</mat-icon>
```

#### Color
```html
<mat-icon color="primary">home</mat-icon>
<mat-icon color="accent">home</mat-icon>
<mat-icon color="warn">home</mat-icon>
```

Or with custom colors:
```css
.custom-icon {
  color: #ff4081;
}
```

```html
<mat-icon class="custom-icon">home</mat-icon>
```

### Using Icons with Buttons
```html
<button mat-icon-button>
  <mat-icon>favorite</mat-icon>
</button>

<button mat-raised-button color="primary">
  <mat-icon>thumb_up</mat-icon>
  Like
</button>

<button mat-fab color="accent">
  <mat-icon>add</mat-icon>
</button>
```

### Using SVG Icons
```typescript
import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MatIconModule],
  template: '<mat-icon svgIcon="custom-icon"></mat-icon>',
})
export class ExampleComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Register a custom icon
    this.iconRegistry.addSvgIcon(
      'custom-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/custom-icon.svg')
    );
  }
}
```

## Finding Icons
You can browse all available Material Icons at:
- [Material Icons Library](https://fonts.google.com/icons?selected=Material+Icons)
- [Material Design Icons](https://material.io/resources/icons/)

## Common Icons

### Navigation
- `home` - Home icon
- `menu` - Hamburger menu
- `arrow_back` - Back arrow
- `arrow_forward` - Forward arrow
- `more_vert` - Vertical ellipsis (more options)
- `more_horiz` - Horizontal ellipsis

### Actions
- `search` - Search icon
- `add` - Plus icon
- `edit` - Edit/pencil icon
- `delete` - Trash can
- `favorite` - Heart icon
- `star` - Star icon
- `check` - Checkmark
- `close` - X icon

### Communication
- `email` - Email icon
- `message` - Chat bubble
- `phone` - Phone icon
- `notifications` - Bell icon

### Social
- `share` - Share icon
- `thumb_up` - Thumbs up
- `person` - User icon
- `group` - Group/users icon

## Troubleshooting

### Icons Not Displaying
1. Make sure you've imported `MatIconModule` in your component or module
2. Verify that the Material Icons font is linked in your index.html:
   ```html
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   ```
3. Check that the icon name is correct (case-sensitive)
4. For SVG icons, ensure the path is correct and the SVG file exists

### Custom SVG Icons Not Working
1. Make sure you've injected `MatIconRegistry` and `DomSanitizer`
2. Verify that the SVG file path is correct
3. Check that the SVG file is properly formatted

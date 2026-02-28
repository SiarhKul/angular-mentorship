import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  template: `
    <div class="file-uploader">
      <label class="file-label" for="file-input">Select file</label>
      <input
        id="file-input"
        type="file"
        [attr.accept]="accept || null"
        [multiple]="multiple"
        (change)="onFilesSelected($event)"
      />

      @if (selectedFiles.length) {
        <ul class="file-list">
          @for (
            file of selectedFiles;
            track file.name + file.size + file.lastModified
          ) {
            <li class="file-item">
              <span>{{ file.name }} ({{ file.size }} bytes)</span>
              <button type="button" (click)="removeFile(file)">Remove</button>
            </li>
          }
        </ul>

        <button type="button" (click)="clearFiles()">Clear all</button>
      }
    </div>
  `,
  styles: [
    `
      .file-uploader {
        display: grid;
        gap: 0.75rem;
        max-width: 420px;
      }

      .file-label {
        font-weight: 600;
      }

      .file-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 0.5rem;
      }

      .file-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
      }
    `,
  ],
})
export class FileUploaderComponent {
  @Input() multiple = false;
  @Input() accept = '';
  @Output() filesChange = new EventEmitter<File[]>();

  selectedFiles: File[] = [];

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];

    console.log('111111', files[0]);

    this.selectedFiles = this.multiple
      ? [...this.selectedFiles, ...files]
      : files.slice(0, 1);

    this.filesChange.emit(this.selectedFiles);

    if (input) {
      input.value = '';
    }
  }

  removeFile(fileToRemove: File): void {
    this.selectedFiles = this.selectedFiles.filter(
      (file) => file !== fileToRemove,
    );
    this.filesChange.emit(this.selectedFiles);
  }

  clearFiles(): void {
    this.selectedFiles = [];
    this.filesChange.emit(this.selectedFiles);
  }
}

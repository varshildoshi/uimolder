import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FieldPreview } from "../field-preview/field-preview";
import { ElementService } from '../../../../services/element.service';

@Component({
  selector: 'app-element-preview',
  imports: [FieldPreview],
  templateUrl: './element-preview.html',
  styleUrl: './element-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementPreview {

  elementService = inject(ElementService);

}

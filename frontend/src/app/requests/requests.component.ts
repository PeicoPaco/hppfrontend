import { Component } from '@angular/core';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

}

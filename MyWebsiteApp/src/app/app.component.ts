import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';  // ✅ Import HomeComponent

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Standalone component
  imports: [HomeComponent],  // ✅ Only HomeComponent is imported
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyWebsiteApp';
}

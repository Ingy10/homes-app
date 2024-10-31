import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, ReactiveFormsModule],
  templateUrl: `./home.component.html`,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  searchFilter = new FormGroup({
    search: new FormControl(""),
  });

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  filterResults() {
    const text = this.searchFilter.value.search ?? "";
    if (!this.searchFilter.value.search)
      this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()) ||
        housingLocation?.state.toLowerCase().includes(text.toLowerCase()) ||
        housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );

    this.searchFilter.reset();
  }

  clearResults() {
    this.filteredLocationList = this.housingLocationList;
  }
}

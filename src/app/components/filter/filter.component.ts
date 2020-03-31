import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
  filter = {
    name: "",
    email: "",
    tour: ""
  };
  showFilter: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

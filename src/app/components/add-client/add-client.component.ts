import { Component, OnInit, ViewChild } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";

import { Client } from "../../models/Client";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.scss"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    name: "",
    email: "",
    tour: "",
    text: "",
    date: ""
  };

  @ViewChild("clientForm") form: any;

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      });
    } else {
      // add new client
      this.clientService.newClient(value);
      // show message
      this.flashMessage.show("New Client added", {
        cssClass: "alert-success",
        timeout: 4000
      });
      // redirect to dashboard
      this.router.navigate(["/"]);
    }
  }

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}

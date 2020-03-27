import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/Client";
import { ClientService } from "../../services/client.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { FlashMessagesModule } from "angular2-flash-messages/module/module";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.scss"]
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    name: "",
    email: "",
    tour: "",
    text: "",
    date: ""
  };

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    // Get Id from URL
    this.id = this.route.snapshot.params["id"];
    // Get the client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      });
    } else {
      // Add id to client
      value.id = this.id;
      // Update Client
      this.clientService.updateClient(value);
      this.flashMessage.show("Client updated", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/client/" + this.id]);
    }
  }
}

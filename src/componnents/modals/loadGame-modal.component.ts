import {Component} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HomeActions} from "../../actions/home.actions";
import {IAppState} from "../../store/index";
import {NgRedux} from "ng2-redux";
import {opacityTransition} from "../../utils/router.animations";

declare var jQuery:any;

@Component({
    selector: 'loadGame-modal',
    templateUrl: 'loadGame-modal.template.html',
    animations: [opacityTransition()],
})
export class LoadGameModalComponent {

    active = false;
    loading: boolean = false;
    steamId;

    game;

    //loadGameForm: FormGroup;

    constructor(private actions: HomeActions,
                private fb: FormBuilder,
                private store: NgRedux<IAppState>) {
        // this.loadGameForm = fb.group({
        //     'steamId': "",
        // });
        store.subscribe(() => this.updateState());
    }

    ngOnInit() {
        // this.game = {
        //     images: "http://placehold.it/350x150",
        //     name: ""
        // };
    }

    updateState() {
        let state = this.store.getState();
        this.game = state.home.loadedGame;
    }

    save() {
        this.actions.saveGame(this.game, () => {
            this.close();
        })
    }

    reset() {
        this.game = null;
    }

    private search() {
        // this.loading = true;
        //
        // setTimeout(() => {
        //     this.loading = false;
        // }, 2000);

        this.loading = true;

        this.actions.getGameFromSteam(this.steamId, () => {
            this.loading = false;
        });
    }

    open() {
        jQuery('#loadGame-modal').modal('show');
    }

    close() {
        jQuery('#loadGame-modal').modal('hide');
    }
}

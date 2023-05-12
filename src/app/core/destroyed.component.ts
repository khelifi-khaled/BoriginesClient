import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export class DestroyedComponent implements OnDestroy {

    protected destroyed$: Subject<boolean> = new Subject<boolean>()

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

}
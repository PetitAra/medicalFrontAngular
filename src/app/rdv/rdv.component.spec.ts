import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RdvComponent } from './rdv.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Patient } from '../classes/patient';
import { Rdv } from '../classes/rdv';
import { FormsModule } from '@angular/forms';

fdescribe('RdvComponent', () => {
  let component: RdvComponent;
  let fixture: ComponentFixture<RdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvComponent ],
      imports: [HttpClientModule, RouterTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('affiche le bon h1', () => {
    const fixture = TestBed.createComponent(RdvComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Liste des Rdv');
    // je cherche un span sous un élément html ayant la classe content -> je récupère son contenu
    // puis je compare avec "medical app is running!"
  });

  it('vérifier la présence de tous les éléments sur la page', () => {
    const fixture = TestBed.createComponent(RdvComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#addbtn')?.textContent).toContain('Ajouter un Rdv');
  });


  
  it("should be able to create a list of rdvs", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    let p = new Patient(1, "Dupont","Paul",new Date("1972-01-05")  , "pp.dd@rr.ff", "01 22 33 44", "adresse", );

    component.rdvs = [
      new Rdv(1,new Date("2021-01-05"),30,"note1","consultation", p),
      new Rdv(1,new Date("2021-01-06"),30,"note2","consultation", p)
    ]

    let user = {
      "id": 1,
      "username": "admin",
      "email": "admin@admin.com",
      "roles": "ROLE_ADMIN",
      "password": "$2a$10$OxEW30aXKpneY40/8UlCoeOaSqPRP5xtvftqDxuQCiGbqVOsPnl4.==",
      "name": "AdministrateurG2",
      "photouser": "profil.jpg"
    }

    sessionStorage.setItem("user",JSON.stringify(user) )

    let nbavantAjout = 0

    component.rdvService.getAll().subscribe( 
      data => { 
        nbavantAjout = data.length

        console.log( "nb avant ajout  = " +  data.length )


        component.submitRdv();

        component.rdvService.getAll().subscribe( 
          data => { 

            console.log( "nb après ajout  = " +  data.length )

            expect( data.length ).toBe( nbavantAjout + 2);

          }
         )

      }
     )



    expect(component).toBeTruthy();
  });
});

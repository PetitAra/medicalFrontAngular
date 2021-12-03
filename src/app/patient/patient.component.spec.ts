import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PatientComponent } from './patient.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Patient } from '../classes/patient';
import { Ville } from '../classes/ville';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientComponent],
      imports: [HttpClientModule, RouterTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('affiche le bon h1', () => {
    const fixture = TestBed.createComponent(PatientComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Liste des patients');
    // je cherche un span sous un élément html ayant la classe content -> je récupère son contenu
    // puis je compare avec "medical app is running!"
  });

  it('vérifier la présence de tous les éléments sur la page', () => {
    const fixture = TestBed.createComponent(PatientComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#addbtn')?.textContent).toContain('Ajouter un patient');

    expect(compiled.querySelector('#searchForm .btn-primary')?.textContent).toContain('Rechercher');

    expect(compiled.querySelector('#no-items-message')?.textContent).toContain('Aucun patient trouvé');
  });

  it("should list all patients", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    let v = new Ville(1, "Paris", 72000, "France");

    let p1 = new Patient(1, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v);
    let p2 = new Patient(2, "Bonjour2", "Dupont2", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v);

    component.patients = [
      new Patient(1, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v),
      new Patient(2, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v),
      new Patient(3, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v),
    ]

    fixture.detectChanges()
    expect(compiled.querySelectorAll('tbody tr').length).toBe(component.patients.length);

    expect(compiled.querySelectorAll('thead').length).toBe(1);
    expect(compiled.querySelectorAll('thead th').length).toBe(6);

    expect(component).toBeTruthy();
  });

  it("should be able to create patient", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    let v = new Ville(1, "Paris", 72000, "France");
    component.patient = new Patient(undefined, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v)

    let user = {
      "id": 1,
      "username": "admin",
      "email": "admin@admin.com",
      "roles": "ROLE_ADMIN",
      "password": "YWRtaW46MTIzNA==",
      "name": "AdministrateurLM",
      "photouser": "inti7ar.jpg"
    }

    sessionStorage.setItem("user",JSON.stringify(user) )

    let nbavantAjout = 0

    component.ps.getAll().subscribe( 
      data => { 
        nbavantAjout = data.length

        console.log( "nb avant ajout  = " +  data.length )


        component.submitPatient();

        component.ps.getAll().subscribe( 
          data => { 

            console.log( "nb après ajout  = " +  data.length )

            expect( data.length ).toBe( nbavantAjout + 1 );

          }
         )

      }
     )



    expect(component).toBeTruthy();
  });

  /*it("should reset correctly", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    let v = new Ville(1, "Paris", 72000, "France");
    component.patient = new Patient(1, "Bonjour", "Dupont", new Date("1972-01-05"), "aa.aa@aa.aa", "01 22 33 44", "Rue de test", v)
    fixture.detectChanges()
    console.log( "++++++++++++++" + compiled.querySelector('#prenomModal')?.nodeValue )
    
    expect(component).toBeTruthy();
  });*/

});

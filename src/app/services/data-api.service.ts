import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TixInterface } from '../models/tix-interface';
import { BookInterface } from '../models/book-interface';
import { CardInterface } from '../models/card-interface';
import { CategoryInterface } from '../models/category-interface';
import { InfoInterface } from '../models/info-interface';
import { ContactInterface } from '../models/contact-interface';
import { ValidationInterface } from '../models/validation-interface';
import { TransactionInterface } from '../models/transaction-interface';
import { UserWService } from "./user-w.service";

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
	tixs: Observable<any>;
	tix: Observable<any>;
	cards: Observable<any>;
	card: Observable<any>;	
	categories: Observable<any>;
	category: Observable<any>;
	contact: Observable<any>;
	info: Observable<any>;
	books: Observable<any>;
	book: Observable<any>;	
	transactions: Observable<any>;
	transaction: Observable<any>;
	validations: Observable<any>;
	validation: Observable<any>;
  constructor(
  	public _uw:UserWService,
  	private http: HttpClient, 
  	private authService:AuthService
  	) {}
   public selectedTix:TixInterface;


  	headers : HttpHeaders = new HttpHeaders({
  		"Content-Type":"application/json",
  		Authorization: this.authService.getToken()
  		});
  	// 

  // 	  updateTix(tix) {
  //   const tixI = tix.tixI;
  //   const token = this.authService.getToken();
  //   const url_api = `https://db.buckapi.com:3041/api/tixes/${tixI}/?access_token=${token}`;
  //   return this.http
  //     .put<TixInterface>(url_api, book, { headers: this.headers })
  //     .pipe(map(data => data));
  // }


  	getBookPending(){	
		const url_api='https://db.buckapi.com:3041/api/book?filter[where][status]=pending';
		return (this.books = this.http.get(url_api));
	}
	getCategories(){	
		const url_api='https://db.buckapi.com:3041/api/categories?filter[where][status]=activated';
		return (this.categories = this.http.get(url_api));
	}
	getTransactions(){	
		const url_api='https://db.buckapi.com:3041/api/transactions?filter[where][status]=activated';
		return (this.transactions = this.http.get(url_api));
	}
	getBookConf(){	
		const url_api='https://db.buckapi.com:3041/api/book?filter[where][status]=Confirmada';
		return (this.books = this.http.get(url_api));
	}
	getValidationPending(){
		const url_api='https://db.buckapi.com:3041/api/validations?filter[where][status]=pending';
		return (this.books = this.http.get(url_api));
	}


	getAllTixs(){
		const url_api = 'https://db.buckapi.com:3041/api/tixes?filter[where][status]=activated';
		return this.http.get(url_api);

	}
	getAllTixsReturn(){
		const url_api = 'https://db.buckapi.com:3041/api/tixes?filter[where][status]=activated';
		return (this.tixs = this.http.get(url_api));

	}
	getTixById(id:string){
		//console.log(id);
		let indice = id;
		const url_api=`https://db.buckapi.com:3041/api/tixes/${indice}`;
		this.tix = this.http.get(url_api);
	
		return (this.tix);
	}
	getCardById(id:string){
		let indice = id;
		const url_api=`https://db.buckapi.com:3041/api/card/${indice}`;
		this.card = this.http.get(url_api);
		return (this.card);
	}
	getBookById(id:string){
		let indice = id;
		const url_api=`https://db.buckapi.com:3041/api/book/${indice}`;
		this.book = this.http.get(url_api);
		return (this.book);
	}
	getInfo(){
		// let indice = id;
		const url_api=`https://db.buckapi.com:3041/api/infos/`;
		this.info = this.http.get(url_api);
		return (this.info);
	}
	getPending(){
		const url_api='https://db.buckapi.com:3041/api/tixes?filter[where][status]=pending';
		return (this.tixs = this.http.get(url_api));
	}
	getUsersPending(){
		const url_api='https://db.buckapi.com:3041/api/card?filter[where][status]=pending';
		return (this.cards = this.http.get(url_api));
	}

	getActivePartners(){
		const url_api='https://db.buckapi.com:3041/api/card?filter[where][and][0][status]=active&filter[where][and][1][type]=partnerType';
		return (this.cards = this.http.get(url_api));
	}
	getPendingPartners(){
		const url_api='https://db.buckapi.com:3041/api/card?filter[where][and][0][status]=pending&filter[where][and][1][type]=partnerType';
		return (this.cards = this.http.get(url_api));
	}

	getActiveAffiliates(){
		const url_api='https://db.buckapi.com:3041/api/card?filter[where][and][0][status]=active&filter[where][and][1][type]=affiliateType';
		return (this.cards = this.http.get(url_api));
	}
	getPendingAffiliates(){
		const url_api='https://db.buckapi.com:3041/api/card?filter[where][and][0][status]=pending&filter[where][and][1][type]=affiliateType';
		return (this.cards = this.http.get(url_api));
	}
	saveTixFree(tix :TixInterface){
	//	let token = this.authService.getToken();
		const url_api='https://db.buckapi.com:3041/api/tixes';
		return this.http
		.post<TixInterface>(url_api, tix)
		.pipe(map(data => data));
	}
	saveTix(tix :TixInterface){
		let token = this.authService.getToken();
		const url_api='https://db.buckapi.com:3041/api/tixes?access_token${token}';
		return this.http
		.post<TixInterface>(url_api, tix,{headers: this.headers})
		.pipe(map(data => data));
	}
	updateTix(tix :TixInterface, id: string){
		let token = this.authService.getToken();
		const url_api=`https://db.buckapi.com:3041/api/tixes/${id}/?access_token$={token}`;
		return this.http
		.put<TixInterface>(url_api, tix,{headers: this.headers})
		.pipe(map(data => data));
	}
	updateBook(book :BookInterface, id: string){
		let token = this.authService.getToken();
		const url_api=`https://db.buckapi.com:3041/api/book/${id}/?access_token$={token}`;
		return this.http
		.put<BookInterface>(url_api, book,{headers: this.headers})
		.pipe(map(data => data));
	}
	updateValidation(validation :ValidationInterface, id: string){
		let token = this.authService.getToken();
		const url_api=`https://db.buckapi.com:3041/api/validations/${id}/?access_token$={token}`;
		return this.http
		.put<ValidationInterface>(url_api, validation,{headers: this.headers})
		.pipe(map(data => data));
	}
	deleteTix(id: string){
		const token = this.authService.getToken();
		const url_api=`https://db.buckapi.com:3041/api/tixes/${id}/?access_token$={token}`;
		return this.http
		.delete<TixInterface>(url_api, {headers: this.headers})
		.pipe(map(data => data));
	}
	getCards(id:string){
		let indice = id;
		const url_api = "https://db.buckapi.com:3041/api/card?filter[where][userd]=a"+indice;
		return this.http.get(url_api);
	}
	saveCard(card: CardInterface){
		//const token = this.authService.getToken();
		//console.log(token);
		const url_api='https://db.buckapi.com:3041/api/card';
		return this.http
		.post<CardInterface>(url_api, card)
		.pipe(map(data => data));
	}
	saveBook(book: BookInterface){
		const url_api='https://db.buckapi.com:3041/api/book';
		return this.http
		.post<BookInterface>(url_api, book)
		.pipe(map(data => data));
	}
	saveValidation(validation: ValidationInterface){
		const url_api='https://db.buckapi.com:3041/api/validations';
		return this.http
		.post<ValidationInterface>(url_api, validation)
		.pipe(map(data => data));
	}
	senMailNewBookAppToUser(book){
		const url_api='https://db.andesproadventures.com:3005/newBookAppToUser';
		return this.http
		.post(url_api, book)
		.pipe(map(data => data));
	}
	senMailNewBookAppToAdmin(book){
		const url_api='https://db.andesproadventures.com:3005/newBookAppToAdmin';
		return this.http
		.post(url_api, book)
		.pipe(map(data => data));
	}
	senMailNewValidationAppToUser(validation){
		const url_api='https://db.andesproadventures.com:3005/newValidationAppToUser';
		return this.http
		.post(url_api, validation)
		.pipe(map(data => data));
	}
	senMailNewValidationAppToAdmin(validation){
		const url_api='https://db.andesproadventures.com:3005/newValidationAppToAdmin';
		return this.http
		.post(url_api, validation)
		.pipe(map(data => data));
	}
	senMailSuccesValidation(book){
		const url_api='https://db.andesproadventures.com:3005/succesValidation';
		return this.http
		.post(url_api, book)
		.pipe(map(data => data));
	}
	senMailNewContactAppToAdmin(contact){
		const url_api='https://db.andesproadventures.com:3005/newContactAppToAdmin';
		return this.http
		.post(url_api, contact)
		.pipe(map(data => data));
	}


}
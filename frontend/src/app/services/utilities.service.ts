import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
/* ************+ Import module auth ************ */
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  headers: any = null;
  DataHeader = null;

  url_host: any = environment.apiUrl;
  data_headers_request: any = '';
  urlSetUploadFile: any = '';

  lang_nav: any = window.navigator.language;

  private index: number = 0;

  constructor(
    private router: Router,
    public http: HttpClient,
    private authService: NbAuthService,
    private toastrService: NbToastrService,
  ) { }

  fnGenerateKey(l: number) {
    let r = '';
    while (r.length < l) { r += Math.random().toString(16).substring(2); }
    return r.substring(0, l);
  }

  fnReturnKey() {
    if (sessionStorage.getItem('payload')) {
      return true;
    } else {
      return false;
    }
  }

  fnDestroySession() {
    sessionStorage.removeItem('payload');
    localStorage.clear();
    sessionStorage.clear();
  }

  fnGetHost() {
    return environment.apiUrl;
  }

  fnValidSection(currentSection, currentView, itemSelectedDateBar) {

    return new Promise((responsePromise) => {

      let response = null;

      if (currentSection === currentView) {
        switch (itemSelectedDateBar) {
          case 'Today':
            response = 'Today';
            break;
          case '7Days':
            response = '7Days';
            break;
          case '30Days':
            response = '30Days';
            break;
          case 'Custom':
            response = '30Days';
            break;
        }
      } else {
        response = false;
      }

      responsePromise(response);
    });

  }

  fnSetRamdonColor() {
    const colors = [
      '#c2e8d3',
      '#bca0b9',
      '#ddadad',
      '#e9e2b3',
      '#A9BABF',
      '#B4D7D8',
      '#B5D4CD',
      '#B6CFBF',
      '#CEEBC4',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  fnOnlyNumber = function (e) {
    const t = e.keyCode ? e.keyCode : e.which;
    if ((t > 47 && t < 58)) {
      return true;
    } else {
      if (t === 8 || t === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
  
  fnSearchTextInArrayObjects(collection_objects, text_criteria, field?) {
    const results = [];
    const toSearch = text_criteria;
    collection_objects.forEach(function (obj, key) {
      Object.keys(obj).forEach(function (ooo, kkk) {
        if (field && field == ooo) {
          if (obj[kkk].indexOf(toSearch) != -1) {
            results.push(obj);
          }
        } else {
          if (obj[kkk].indexOf(toSearch) != -1) {
            results.push(obj);
          }
        }
      });
    });
    return results;
  }
  
  filterIt(arr, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
  }
  
  fnSearch(collection, data, field) {
    const arr = JSON.parse(JSON.stringify(collection));
    if (arr) {
      const search = data.toLowerCase();
      return arr.filter((obj) => {
        const datafield = { filter: obj[field].toLowerCase() };
        return Object.values(datafield).some((val) => {
          return val.includes(search);
        });
      });
    }
  }
  
  fnGetCurrentTokenSession(returnObserver) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // here we receive a payload from the token and assigne it to our `user` variable
        const current_payload = token.getValue();
        if (current_payload) {
          returnObserver(current_payload);
        } else {
          returnObserver(false);
        }
      }
    });
  }
  
  fnSetErrors(code_error_api, text_default?) {
    const errors_collection = [];
    switch (code_error_api) {
      case 'MSG01':
        errors_collection.push('User already exist in the database!');
        break;
      case 'MSG02':
        errors_collection.push('Passwords do not match.!');
        break;
      case 'MSG03':
        errors_collection.push('User does not accept terms and conditions!');
        break;
      case 'MSG04':
        errors_collection.push('User does not exists!');
        break;
      case 'MSG05':
        errors_collection.push('Account is locked!');
        break;
      case 'MSG06':
        errors_collection.push('Username or password is incorrect!');
        break;
      case 'MSG07':
        errors_collection.push('Account is not active!');
        break;
      case 'MSG08':
        errors_collection.push('Username or password is incorrect!');
        break;
      case 'MSG09':
        errors_collection.push('Project already exists!');
        break;
      case 'MSG10':
        errors_collection.push('Project not exists!');
        break;
      case 'MSG11':
        errors_collection.push('User is not  associated to the project!');
        break;
      case 'MSG12':
        errors_collection.push('Version already exists!');
        break;
      case 'MSG13':
        errors_collection.push('Competitor already exists!');
        break;
      case 'MSG14':
        errors_collection.push('Category already exist !');
        break;
      case 'MSG15':
        errors_collection.push('Price List already exist!');
        break;
      case 'MSG16':
        errors_collection.push('Competitor Perceived Value Qualifications already exists!');
        break;
      case 'MSG17':
        errors_collection.push('Category Name repeat from import file!');
        break;
      case 'MSG18':
        errors_collection.push('Competitor repeat from import file!');
        break;
      case 'MSG19':
        errors_collection.push('Price list repeat from import file!');
        break;
      case 'MSG20':
        errors_collection.push('Categories do not match!');
        break;
      case 'MSG21':
        errors_collection.push('Product code, product name and price list combination already esists for the project!');
        break;
      case 'MSG22':
        errors_collection.push('Market prices repeat from import file!');
        break;
      default:
        errors_collection.push(text_default);
        break;
    }
    return errors_collection;
  }

  showToast(position, status, message, icon?) {
    this.index += 1;
    const duration = status == 'warning' ? 11000 : 6000;
    this.toastrService.show(status, message, { position, status, duration });
  }
  
  fnSetDefineTokenAuthorization(payload) {
    this.data_headers_request = new HttpHeaders().set('Authorization', payload);
    return this.data_headers_request;
  }

  fnHttSetUploadFile(guid_user: any, fileToUpload: File, end_point_url: any, parameter?): Observable<any> {
    const headers = this.fnSetDefineTokenAuthorization(guid_user);
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    const urlSetUploadFile = (parameter) ? end_point_url + '?' + parameter + '=' : end_point_url;
    this.urlSetUploadFile = urlSetUploadFile;
    // this.urlSetUploadFile = urlSetUploadFile + '&language=' + language;
    return this.http.post(this.fnGetHost() + this.urlSetUploadFile, formData, {
      observe: 'response',
      headers: headers,
      reportProgress: true,
    });
  }
  
  formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      const negativeSign = amount < 0 ? '-' : ''; 
      const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      const j = (i.length > 3) ? i.length % 3 : 0;
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - parseInt(i)).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
    }
  }
  
  formatPercentage(value, num_decimals) {
    const value_percentage = parseFloat(value) * 100;
    const new_value_percentage = value_percentage.toFixed(num_decimals) + '%';
    return new_value_percentage;
  }
  
  numberOnly(evt): boolean {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46 && evt.srcElement.value.split('.').length>1) {
        return false;
    }
    if (charCode != 37 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
  }

  format_number(number) {
    return number.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

}

// import { Pipe, PipeTransform } from '@angular/core';
//
// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe implements PipeTransform {
//   transform(items: any[], searchText: string): any[] {
//     if (!items) return [];
//     if (!searchText) return items;
//
//     return items.filter(item => {
//       return Object.keys(item).some(key => {
//         return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
//       });
//     });
//   }
// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, keys: string, term: string) {
    if (!term) {
      return value;
    }
    return (value || []).filter((item: { [x: string]: string; // @ts-ignore
      hasOwnProperty: (arg0: string) => any; }) => keys.split(',').some(key =>
      item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  }

}

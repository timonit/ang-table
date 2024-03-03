import { Company } from '@/entities/company/model/types';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { filterFeat } from '../../model/filter.feat';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  imports: [ReactiveFormsModule],
})
export class Filter {
  filter = this.formBuilder.group({
    _id: '',
    isActive: false,
    balance: '',
    picture: '',
    age: 0,
    name: '',
    company: '',
    email: '',
    address: '',
    tags: '',
    favoriteFruit: '',
  });
  constructor(private formBuilder: FormBuilder) {}

  reset(event: Event) {
    event.preventDefault();
    this.filter.reset();
    this.submit(event);
  }

  async submit(event: Event) {
    event.preventDefault();
    const filt = Object.entries(this.filter.value).reduce((acc, [key, val]) => {
      if (!val) return acc;

      let value = !Number.isNaN(val) ? Number(val) : val;
      if (val === true) value = true;
      if (key === 'name') {
        const splitedVal = (val as string).split(' ');
        // @ts-ignore
        value = {
          first: splitedVal[0],
          last: splitedVal.length > 1 ? splitedVal[1] : ''
        };
      }

      if (key === 'tags') {
        // @ts-ignore
        value = (val as string).split(' ');;
      }

      return { ...acc, [key]: value };
    }, {});

    const list = await filterFeat(filt);
  }
}

import mongoose from 'mongoose';
import '../models/RateItem';
import { db } from '../config/config.json';


const RateItem = mongoose.model('RateItem');

export function connect() {
  mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`);
}

export function listItems(filter) {
  return RateItem.find(filter);
}

export function createItem(data) {
  const rateItem = new RateItem({
    name: data.name,
    rate: data.rate,
    count: data.count,
    description: data.description,
  });

  return rateItem.save();
}

export function deleteItem(id) {
  return RateItem.findById(id).remove();
}

export function updateItem(department, rate, text) {
  RateItem.findOne({ name: department }, (err, rateItem) => {
    if (err) return console.log(err);
    rateItem.rate = (rateItem.rate * rateItem.count + rate) / (rateItem.count + 1);
    rateItem.count += 1;
    rateItem.detailInfo = rateItem.detailInfo.concat({
      count: rateItem.count,
      date: Date.now(),
      rate,
      comment: text,
    });
    rateItem.save();
  });
}

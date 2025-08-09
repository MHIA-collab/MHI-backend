// seed.js — run with `node seed.js` after setting .env MONGO_URI
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Announcement = require('./models/Announcement');
const Assignment = require('./models/Assignment');
const bcrypt = require('bcryptjs');

async function run(){
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({}); await Course.deleteMany({}); await Announcement.deleteMany({}); await Assignment.deleteMany({});
  const admin = await User.create({ name:'Admin User', email:'admin@mhi.local', password: await bcrypt.hash('password',10), role:'admin' });
  const inst = await User.create({ name:'Maya Instructor', email:'maya@mhi.local', password: await bcrypt.hash('password',10), role:'instructor' });
  const stud = await User.create({ name:'John Student', email:'john@mhi.local', password: await bcrypt.hash('password',10), role:'student' });
  const c1 = await Course.create({ id:'C101', title:'Intro to MHI Systems', instructor:inst._id, credits:3, students:[stud._id] });
  await Announcement.create({ title:'Welcome', body:'Orientation tomorrow', author:admin._id, date:new Date() });
  await Assignment.create({ course:c1._id, title:'Project 1', dueDate:new Date(Date.now()+7*24*60*60*1000), attachments:[], grades:[{ student: stud._id, grade:82 }] });
  console.log('Seeded');
  process.exit(0);
}
run();

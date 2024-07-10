import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AssessmentsState } from '../../helpers/types';

// export const mockData = [

//     {
//         "_id": "664de3e295d087b8cdcca4a0"
//        ,
//         "name": "Manish",
//         "title": "What is the name of the assessment?",
//         "profileType": "college",
//         "module": [
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f6"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f7"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f8"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f9"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fa"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fb"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fc"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fd"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665229ddd1433e6ea98976f5"
//             },
//             "position": 1
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5a"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5b"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5c"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5d"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5e"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5f"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf60"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf61"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "66522a7cb1d751cda22cbf59"
//             },
//             "position": 2
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedd"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fede"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedf"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee0"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee1"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee2"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee3"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee4"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665233503b5cb637d6f7fedc"
//             },
//             "position": 3
//           }
//         ],

//         "question": [
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "664ee966ca80ad8f2f0198de"
//             },
//             "options": [],
//             "title" : "q1 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "665069ab8482939219407e6a"
//             },
//             "options": [],
//             "title" : "q2 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What you want to ask from user?",
//             "type": "multiple-choice",
//             "isUser": true,
//             "options": [
//               {
//                 "name": "Name",
//                 "title": "Name"
//               },
//               {
//                 "name": "Age",
//                 "title": "Age"
//               }
//             ],
//             "title" : "q3 title",
//             "profile" : "college"
//           }
//         ],
//         "skills": [
//           "nodejs",
//           "reactjs",
//           "nodejs",
//           "reactjs"
//         ],
//         order: 1,
//         status : "active"
//       },
//       {
//         "_id": "664de3e295d087b8cdcca4a1"
//        ,
//         "name": "Pankaj",
//         "title": "What is the name of the assessment?",
//         "profileType": "college",
//         "module": [
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f6"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f7"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f8"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f9"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fa"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fb"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fc"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fd"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665229ddd1433e6ea98976f5"
//             },
//             "position": 1
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5a"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5b"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5c"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5d"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5e"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5f"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf60"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf61"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "66522a7cb1d751cda22cbf59"
//             },
//             "position": 2
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedd"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fede"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedf"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee0"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee1"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee2"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee3"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee4"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665233503b5cb637d6f7fedc"
//             },
//             "position": 3
//           }
//         ],

//         "question": [
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "664ee966ca80ad8f2f0198de"
//             },
//             "options": [],
//             "title" : "q1 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "665069ab8482939219407e6a"
//             },
//             "options": [],
//             "title" : "q2 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What you want to ask from user?",
//             "type": "multiple-choice",
//             "isUser": true,
//             "options": [
//               {
//                 "name": "Name",
//                 "title": "Name"
//               },
//               {
//                 "name": "Age",
//                 "title": "Age"
//               }
//             ],
//             "title" : "q3 title",
//             "profile" : "college"
//           }
//         ],
//         "skills": [
//           "nodejs",
//           "reactjs",
//           "nodejs",
//           "reactjs"
//         ],
//         order: 3,
//         status : "inactive"

//       },
//       {
//         "_id": "664de3e295d087b8cdcca4a2"
//        ,
//         "name": "Suraj",
//         "title": "What is the name of the assessment?",
//         "profileType": "college",
//         "module": [
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f6"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f7"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f8"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f9"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fa"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fb"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fc"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fd"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665229ddd1433e6ea98976f5"
//             },
//             "position": 1
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5a"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5b"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5c"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5d"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5e"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5f"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf60"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf61"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "66522a7cb1d751cda22cbf59"
//             },
//             "position": 2
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedd"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fede"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedf"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee0"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee1"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee2"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee3"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee4"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665233503b5cb637d6f7fedc"
//             },
//             "position": 3
//           }
//         ],

//         "question": [
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "664ee966ca80ad8f2f0198de"
//             },
//             "options": [],
//             "title" : "q1 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "665069ab8482939219407e6a"
//             },
//             "options": [],
//             "title" : "q2 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What you want to ask from user?",
//             "type": "multiple-choice",
//             "isUser": true,
//             "options": [
//               {
//                 "name": "Name",
//                 "title": "Name"
//               },
//               {
//                 "name": "Age",
//                 "title": "Age"
//               }
//             ],
//             "title" : "q3 title",
//             "profile" : "college"
//           }
//         ],
//         "skills": [
//           "nodejs",
//           "reactjs",
//           "nodejs",
//           "reactjs"
//         ],
//         order: 2,
//         status : "inactive"

//       },
//       {
//         "_id": "664de3e295d087b8cdcca4a3"
//        ,
//         "name": "Suresh",
//         "title": "What is the name of the assessment?",
//         "profileType": "college",
//         "module": [
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f6"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f7"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f8"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f9"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fa"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fb"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fc"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fd"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665229ddd1433e6ea98976f5"
//             },
//             "position": 1
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5a"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5b"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5c"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5d"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5e"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5f"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf60"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf61"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "66522a7cb1d751cda22cbf59"
//             },
//             "position": 2
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedd"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fede"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedf"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee0"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee1"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee2"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee3"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee4"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665233503b5cb637d6f7fedc"
//             },
//             "position": 3
//           }
//         ],

//         "question": [
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "664ee966ca80ad8f2f0198de"
//             },
//             "options": [],
//             "title" : "q1 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "665069ab8482939219407e6a"
//             },
//             "options": [],
//             "title" : "q2 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What you want to ask from user?",
//             "type": "multiple-choice",
//             "isUser": true,
//             "options": [
//               {
//                 "name": "Name",
//                 "title": "Name"
//               },
//               {
//                 "name": "Age",
//                 "title": "Age"
//               }
//             ],
//             "title" : "q3 title",
//             "profile" : "college"
//           }
//         ],
//         "skills": [
//           "nodejs",
//           "reactjs",
//           "nodejs",
//           "reactjs"
//         ],
//         order: 5,
//         status : "inactive"

//       },
//       {
//         "_id": "664de3e295d087b8cdcca4a4"
//        ,
//         "name": "Gulashan",
//         "title": "What is the name of the assessment?",
//         "profileType": "college",
//         "module": [
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f6"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f7"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f8"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976f9"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fa"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fb"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fc"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [],
//                 "_id": {
//                   "$oid": "665229ddd1433e6ea98976fd"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665229ddd1433e6ea98976f5"
//             },
//             "position": 1
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5a"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5b"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5c"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5d"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5e"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf5f"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf60"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "66522a7cb1d751cda22cbf61"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "66522a7cb1d751cda22cbf59"
//             },
//             "position": 2
//           },
//           {
//             "name": "Quantitative Aptitude",
//             "type": "quiz",
//             "noOfQuestion": 10,
//             "question": [
//               {
//                 "title": "What is the sum of the first 20 natural numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "210",
//                   "220",
//                   "230"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedd"
//                 }
//               },
//               {
//                 "title": "If 40% of a number is 120, what is the number?",
//                 "type": "quiz",
//                 "options": [
//                   "200",
//                   "250",
//                   "300",
//                   "400"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fede"
//                 }
//               },
//               {
//                 "title": "What is the least common multiple (LCM) of 15 and 20?",
//                 "type": "quiz",
//                 "options": [
//                   "60",
//                   "75",
//                   "80",
//                   "100"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fedf"
//                 }
//               },
//               {
//                 "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                 "type": "quiz",
//                 "options": [
//                   "$500",
//                   "$480",
//                   "$470",
//                   "$460"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee0"
//                 }
//               },
//               {
//                 "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                 "type": "quiz",
//                 "options": [
//                   "2 km",
//                   "4 km",
//                   "6 km ",
//                   "8 km"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee1"
//                 }
//               },
//               {
//                 "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                 "type": "quiz",
//                 "options": [
//                   "25",
//                   "30",
//                   "35",
//                   "40"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee2"
//                 }
//               },
//               {
//                 "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                 "type": "quiz",
//                 "options": [
//                   "24",
//                   "28",
//                   "30",
//                   "32"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee3"
//                 }
//               },
//               {
//                 "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                 "type": "quiz",
//                 "options": [
//                   "21",
//                   "23",
//                   "25",
//                   "29"
//                 ],
//                 "_id": {
//                   "$oid": "665233503b5cb637d6f7fee4"
//                 }
//               }
//             ],
//             "skills": [
//               "Basics of numbers",
//               "Divisibility rules",
//               "Prime numbers",
//               "Composite numbers",
//               "HCF and LCM",
//               "Odd and even numbers"
//             ],
//             "time": "20",
//             "_id": {
//               "$oid": "665233503b5cb637d6f7fedc"
//             },
//             "position": 3
//           }
//         ],

//         "question": [
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "664ee966ca80ad8f2f0198de"
//             },
//             "options": [],
//             "title" : "q1 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What is the name of the assessment?",
//             "type": "text",
//             "answer": "Manish",
//             "_id": {
//               "$oid": "665069ab8482939219407e6a"
//             },
//             "options": [],
//             "title" : "q2 title",
//             "profile" : "college"
//           },
//           {
//             "name": "What you want to ask from user?",
//             "type": "multiple-choice",
//             "isUser": true,
//             "options": [
//               {
//                 "name": "Name",
//                 "title": "Name"
//               },
//               {
//                 "name": "Age",
//                 "title": "Age"
//               }
//             ],
//             "title" : "q3 title",
//             "profile" : "college"
//           }
//         ],
//         "skills": [
//           "nodejs",
//           "reactjs",
//           "nodejs",
//           "reactjs"
//         ],
//         order: 4,
//         status : "active"

//       }

// ]

// export const mockData =  [
//     {
//         "_id": "664de3e295d087b8cdcca4a0",
//         "name": "Manish",
//         "title": "What is the name of the assessment?",
//         "profileType": "college",
//         "module": [
//             {
//                 "name": "Quantitative Aptitude",
//                 "type": "quiz",
//                 "noOfQuestion": 10,
//                 "question": [
//                     {
//                         "title": "What is the sum of the first 20 natural numbers?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976f6"
//                     },
//                     {
//                         "title": "If 40% of a number is 120, what is the number?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976f7"
//                     },
//                     {
//                         "title": "What is the least common multiple (LCM) of 15 and 20?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976f8"
//                     },
//                     {
//                         "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976f9"
//                     },
//                     {
//                         "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976fa"
//                     },
//                     {
//                         "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976fb"
//                     },
//                     {
//                         "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976fc"
//                     },
//                     {
//                         "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                         "type": "quiz",
//                         "options": [],
//                         "_id": "665229ddd1433e6ea98976fd"
//                     }
//                 ],
//                 "skills": [
//                     "Basics of numbers",
//                     "Divisibility rules",
//                     "Prime numbers",
//                     "Composite numbers",
//                     "HCF and LCM",
//                     "Odd and even numbers"
//                 ],
//                 "time": "20",
//                 "_id": "665229ddd1433e6ea98976f5",
//                 "position": 1
//             },
//             {
//                 "name": "Quantitative Aptitude",
//                 "type": "quiz",
//                 "noOfQuestion": 10,
//                 "question": [
//                     {
//                         "title": "What is the sum of the first 20 natural numbers?",
//                         "type": "quiz",
//                         "options": [
//                             "200",
//                             "210",
//                             "220",
//                             "230"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf5a"
//                     },
//                     {
//                         "title": "If 40% of a number is 120, what is the number?",
//                         "type": "quiz",
//                         "options": [
//                             "200",
//                             "250",
//                             "300",
//                             "400"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf5b"
//                     },
//                     {
//                         "title": "What is the least common multiple (LCM) of 15 and 20?",
//                         "type": "quiz",
//                         "options": [
//                             "60",
//                             "75",
//                             "80",
//                             "100"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf5c"
//                     },
//                     {
//                         "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                         "type": "quiz",
//                         "options": [
//                             "$500",
//                             "$480",
//                             "$470",
//                             "$460"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf5d"
//                     },
//                     {
//                         "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                         "type": "quiz",
//                         "options": [
//                             "2 km",
//                             "4 km",
//                             "6 km ",
//                             "8 km"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf5e"
//                     },
//                     {
//                         "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                         "type": "quiz",
//                         "options": [
//                             "25",
//                             "30",
//                             "35",
//                             "40"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf5f"
//                     },
//                     {
//                         "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                         "type": "quiz",
//                         "options": [
//                             "24",
//                             "28",
//                             "30",
//                             "32"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf60"
//                     },
//                     {
//                         "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                         "type": "quiz",
//                         "options": [
//                             "21",
//                             "23",
//                             "25",
//                             "29"
//                         ],
//                         "_id": "66522a7cb1d751cda22cbf61"
//                     }
//                 ],
//                 "skills": [
//                     "Basics of numbers",
//                     "Divisibility rules",
//                     "Prime numbers",
//                     "Composite numbers",
//                     "HCF and LCM",
//                     "Odd and even numbers"
//                 ],
//                 "time": "20",
//                 "_id": "66522a7cb1d751cda22cbf59",
//                 "position": 2
//             },
//             {
//                 "name": "Quantitative Aptitude",
//                 "type": "quiz",
//                 "noOfQuestion": 10,
//                 "question": [
//                     {
//                         "title": "What is the sum of the first 20 natural numbers?",
//                         "type": "quiz",
//                         "options": [
//                             "200",
//                             "210",
//                             "220",
//                             "230"
//                         ],
//                         "_id": "665233503b5cb637d6f7fedd"
//                     },
//                     {
//                         "title": "If 40% of a number is 120, what is the number?",
//                         "type": "quiz",
//                         "options": [
//                             "200",
//                             "250",
//                             "300",
//                             "400"
//                         ],
//                         "_id": "665233503b5cb637d6f7fede"
//                     },
//                     {
//                         "title": "What is the least common multiple (LCM) of 15 and 20?",
//                         "type": "quiz",
//                         "options": [
//                             "60",
//                             "75",
//                             "80",
//                             "100"
//                         ],
//                         "_id": "665233503b5cb637d6f7fedf"
//                     },
//                     {
//                         "title": "A shopkeeper sold an item for $450 after offering a 10% discount. What was the original price of the item?",
//                         "type": "quiz",
//                         "options": [
//                             "$500",
//                             "$480",
//                             "$470",
//                             "$460"
//                         ],
//                         "_id": "665233503b5cb637d6f7fee0"
//                     },
//                     {
//                         "title": "A man can row 6 km/hr in still water. If the river is flowing at 3 km/hr, it takes him 1 hour to row to a place and come back. How far is the place?",
//                         "type": "quiz",
//                         "options": [
//                             "2 km",
//                             "4 km",
//                             "6 km ",
//                             "8 km"
//                         ],
//                         "_id": "665233503b5cb637d6f7fee1"
//                     },
//                     {
//                         "title": "What is the value of (152+202)1/2(152 +202) 1/2 ?",
//                         "type": "quiz",
//                         "options": [
//                             "25",
//                             "30",
//                             "35",
//                             "40"
//                         ],
//                         "_id": "665233503b5cb637d6f7fee2"
//                     },
//                     {
//                         "title": "If the ratio of the ages of two persons is 4:5 and the sum of their ages is 54, what is the age of the younger person?",
//                         "type": "quiz",
//                         "options": [
//                             "24",
//                             "28",
//                             "30",
//                             "32"
//                         ],
//                         "_id": "665233503b5cb637d6f7fee3"
//                     },
//                     {
//                         "title": "The average of five consecutive odd numbers is 27. What is the smallest of these numbers?",
//                         "type": "quiz",
//                         "options": [
//                             "21",
//                             "23",
//                             "25",
//                             "29"
//                         ],
//                         "_id": "665233503b5cb637d6f7fee4"
//                     }
//                 ],
//                 "skills": [
//                     "Basics of numbers",
//                     "Divisibility rules",
//                     "Prime numbers",
//                     "Composite numbers",
//                     "HCF and LCM",
//                     "Odd and even numbers"
//                 ],
//                 "time": "20",
//                 "_id": "665233503b5cb637d6f7fedc",
//                 "position": 3
//             }
//         ],
//         "__v": 0,
//         "question": [
//             {
//                 "isUser": false,
//                 "name": "What is the name of the assessment?",
//                 "type": "text",
//                 "answer": "Manish",
//                 "_id": "664ee966ca80ad8f2f0198de",
//                 "options": []
//             },
//             {
//                 "isUser": false,
//                 "name": "What is the name of the assessment?",
//                 "type": "text",
//                 "answer": "Manish",
//                 "_id": "665069ab8482939219407e6a",
//                 "options": []
//             },
//             {
//                 "_id": "666690fc8d6635cd6f31e2b9",
//                 "name": "What you want to ask from user?",
//                 "type": "multiple-choice",
//                 "isUser": true,
//                 "options": [
//                     {
//                         "_id": "666690fc8d6635cd6f31e2ba",
//                         "name": "Name",
//                         "title": "Name"
//                     },
//                     {
//                         "_id": "666690fc8d6635cd6f31e2bb",
//                         "name": "Age",
//                         "title": "Age"
//                     }
//                 ]
//             }
//         ],
//         "skills": [
//             "nodejs",
//             "reactjs",
//             "nodejs",
//             "reactjs",
//             "nodejs",
//             "reactjs"
//         ],
//         "createdAt": "2024-04-06T11:55:31.307Z",
//         "updatedAt": "2024-06-05T05:24:18.101Z",
//         "organizationId": "6647aca2b9dbcaa3641bbf11"
//     },
//     {
//         "_id": "6661a3b333c0d390f655f578",
//         "organizationId": "6647aca2b9dbcaa3641bbf11",
//         "name": "New Assessment Testing",
//         "title": "What is the name of the assessment?",
//         "profileType": "college",
//         "skills": [],
//         "question": [],
//         "module": [],
//         "createdAt": "2024-06-06T11:55:31.307Z",
//         "updatedAt": "2024-06-06T11:55:31.307Z",
//         "__v": 0
//     }
// ]

const initialState: AssessmentsState[] = [];

export const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState,
  reducers: {
    getAll: (_state, action: PayloadAction<AssessmentsState[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return [...action.payload];
    },

    getByName: (state, action: PayloadAction<{ assessmentId: string }>) => {
      const { assessmentId } = action.payload;
      state.filter((assessment) => assessment.name === assessmentId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAll, getByName } = assessmentsSlice.actions;

export default assessmentsSlice.reducer;

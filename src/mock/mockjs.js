import Mock from 'mockjs'
import {banner} from './banner'
// const Mock = require('mockjs')
// Mock.mock( url, post/get , 返回的数据)；
// tcapp/ads/classify
Mock.mock(/^[a-zA-Z0-9:/./-]+tcapp\/ads\/classify/, 'get', banner)

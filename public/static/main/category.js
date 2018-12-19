/* global layui appVersion */
layui.config({
  base: '/static/javascripts/',
  version: appVersion
}).extend({
  headerNav: 'modules/headerNav',
  service: 'modules/service'
}).use('category')

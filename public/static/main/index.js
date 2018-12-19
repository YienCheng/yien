/* global layui appVersion */
layui.config({
  base: '/static/javascripts/',
  version: appVersion
}).extend({
  siderNav: 'modules/siderNav',
  headerNav: 'modules/headerNav',
  service: 'modules/service'
}).use('index')

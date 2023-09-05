import tracer from 'dd-trace';

tracer.init({
  sampleRate: 1,
  logInjection: true,
  env: 'prd',
  service: 'hello-nest',
  version: '1.0.0',
  tags: {
    owner: 'hj',
    team: 'dd',
  },
});
console.log('dd-trace.js');
export default tracer;

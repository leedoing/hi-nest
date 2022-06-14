import tracer from 'dd-trace';

tracer.init({
  logInjection: true,
  runtimeMetrics: true,
  tags: {
    env: 'stg',
    owner: 'jin',
  },
});

export default tracer;

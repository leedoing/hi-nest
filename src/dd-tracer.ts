import tracer from 'dd-trace';

tracer.init({
  logInjection: true,
  runtimeMetrics: true,
  tags: {
    env: 'stg',
    owner: 'jin',
    service: 'todo-nestjs',
  },
});

export default tracer;

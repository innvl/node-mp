import { logger } from '../lib';

export const logRequest = () =>
    (
        _target: unknown,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        const requestMethod = descriptor.value;
        descriptor.value = async function m(...args: unknown[]) {
            try {
                logger.info(`
                            Method Name: ${propertyKey};
                            Arguments: ${args?.length ? args.join(' ,') : 'No Arguments'}
                            `);
                return await requestMethod.apply(this, args);
            } catch (e) {
                logger.error(`
                        Method Name: ${propertyKey};
                        Arguments: ${args?.length ? args.join(' ,') : 'No Arguments'};
                        Error: ${e}
                `);
                throw e;
            }
        };

        return descriptor;
    };

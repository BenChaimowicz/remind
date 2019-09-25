import { registerDecorator, ValidationArguments } from 'class-validator';
import { isMoment } from 'moment';

export function isMomentDate() {
    return function (object: Object, propName: string) {
        registerDecorator({
            name: 'isMomentDate',
            target: object.constructor,
            propertyName: propName,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isMoment(value);        
                }
            }
        })
    }
}
import 'reflect-metadata';
import { EnsureLength } from '../../src/service-layer/operators/ensure.length';
import { of, Observable } from 'rxjs';
import { injectable, inject, interfaces, Container } from 'inversify';
import { map } from 'rxjs/operators';

@injectable()
class Exception extends Error {
    public status = 500;
    public details = {};

    public constructor(message?: string) {
        super(message);
    }
}

@injectable()
class TestErrorClass {
    public constructor(
        @inject('Exception') private exceptionContructor: interfaces.Newable<Exception>
    ) {}

    perform(): Observable<void> {
        return of([])
            .pipe(
                EnsureLength(this.exceptionContructor, 2),
                map(() => {})
            );
    }
}

function expectSuccess(done: (err?: any) => void) {
    return {
        next: () => done(),
        error: done
    }
}

function expectError(done: (err?: any) => void) {
    return {
        next: () => done('whoops'),
        error: (err: any) => {
            expect(err.status).toBe(500);
            done();
        }
    }
}

test('Correct Size', (done) => {
    of([[]]).pipe(
        EnsureLength(Exception, 1, 2, 3, 4, 5)
    ).subscribe({
        next: () => done('whoops'),
        error: err => {
            expect(err.status).toBeUndefined();
            done();
        }
    });
});

test('Injected', (done) => {
    const container = new Container();
    container.bind<interfaces.Newable<Exception>>('Exception').toConstructor(Exception);
    container.bind(TestErrorClass).toSelf();
    const cls = container.get<TestErrorClass>(TestErrorClass);
    cls.perform().subscribe(expectError(done));
});

test('EnsureLength - 1 - Success', (done) => {
    of([[]]).pipe(
        EnsureLength(Exception, 1)
    ).subscribe(expectSuccess(done));
});

test('EnsureLength - 1|1 - Success', (done) => {
    of([[1]]).pipe(
        EnsureLength(Exception, 1, 1)
    ).subscribe(expectSuccess(done));
});

test('EnsureLength - 2 - Success', (done) => {
    of([[],[]]).pipe(
        EnsureLength(Exception, 2)
    ).subscribe(expectSuccess(done));
});

test('EnsureLength - 3 - Success', (done) => {
    of([[],[], []]).pipe(
        EnsureLength(Exception, 3)
    ).subscribe(expectSuccess(done));
});

test('EnsureLength - 3|1|+ - Success', (done) => {
    of([[1],[1,2,3,4,5], [1,2,3,4,5,6]]).pipe(
        EnsureLength(Exception, 3, 1)
    ).subscribe(expectSuccess(done));
});

test('EnsureLength - 3|1|2|3 - Success', (done) => {
    of([[1],[1, 2], [1, 2, 3]]).pipe(
        EnsureLength(Exception, 3, 1, 2, 3)
    ).subscribe(expectSuccess(done));
});

// failures
test('EnsureLength - 1 - Failure', (done) => {
    of([[], []]).pipe(
        EnsureLength(Exception, 1)
    ).subscribe(expectError(done));
});

test('EnsureLength - 1 - Failure 2', (done) => {
    of([]).pipe(
        EnsureLength(Exception, 1)
    ).subscribe(expectError(done));
});

test('EnsureLength - 1|1 - Failure', (done) => {
    of([[]]).pipe(
        EnsureLength(Exception, 1, 1)
    ).subscribe(expectError(done));
});

test('EnsureLength - 1|1 - Failure 2', (done) => {
    of([[1, 2]]).pipe(
        EnsureLength(Exception, 1, 1)
    ).subscribe(expectError(done));
});

test('EnsureLength - 2 - Failure', (done) => {
    of([[],[],[]]).pipe(
        EnsureLength(Exception, 2)
    ).subscribe(expectError(done));
});

test('EnsureLength - 2 - Failure 2', (done) => {
    of([[]]).pipe(
        EnsureLength(Exception, 2)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3 - Failure', (done) => {
    of([[],[], [], []]).pipe(
        EnsureLength(Exception, 3)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3 - Failure 2', (done) => {
    of([[],[]]).pipe(
        EnsureLength(Exception, 3)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3|1|+ - Failure', (done) => {
    of([[],[1,2,3,4,5], [1,2,3,4,5,6]]).pipe(
        EnsureLength(Exception, 3, 1)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3|1|+ - Failure 2', (done) => {
    of([[1, 2],[1,2,3,4,5], [1,2,3,4,5,6]]).pipe(
        EnsureLength(Exception, 3, 1)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3|1|2|3 - Failure', (done) => {
    of([[1],[1, 2, 3], [1, 2, 3]]).pipe(
        EnsureLength(Exception, 3, 1, 2, 3)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3|1|2|3 - Failure 2', (done) => {
    of([[1],[1], [1, 2, 3]]).pipe(
        EnsureLength(Exception, 3, 1, 2, 3)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3|1|2|3 - Failure 3', (done) => {
    of([[1],[1, 2], [1, 2, 3, 4]]).pipe(
        EnsureLength(Exception, 3, 1, 2, 3)
    ).subscribe(expectError(done));
});

test('EnsureLength - 3|1|2|3 - Failure 4', (done) => {
    of([[1],[1, 2], [1, 2]]).pipe(
        EnsureLength(Exception, 3, 1, 2, 3)
    ).subscribe(expectError(done));
});
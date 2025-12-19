
    export type RemoteKeys = '@library/Button';
    type PackageType<T> = T extends '@library/Button' ? typeof import('@library/Button') :any;
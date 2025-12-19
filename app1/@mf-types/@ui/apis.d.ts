
    export type RemoteKeys = '@ui/Button';
    type PackageType<T> = T extends '@ui/Button' ? typeof import('@ui/Button') :any;
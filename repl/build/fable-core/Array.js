define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function map(f, source, TargetCons) {
        const target = new TargetCons(source.length);
        for (let i = 0; i < source.length; i++) {
            target[i] = f(source[i]);
        }
        return target;
    }
    exports.map = map;
    function mapIndexed(f, source, TargetCons) {
        const target = new TargetCons(source.length);
        for (let i = 0; i < source.length; i++) {
            target[i] = f(i, source[i]);
        }
        return target;
    }
    exports.mapIndexed = mapIndexed;
    function indexed(source) {
        return mapIndexed((i, x) => [i, x], source, Array);
    }
    exports.indexed = indexed;
    function addRangeInPlace(range, xs) {
        const iter = range[Symbol.iterator]();
        let cur = iter.next();
        while (!cur.done) {
            xs.push(cur.value);
            cur = iter.next();
        }
    }
    exports.addRangeInPlace = addRangeInPlace;
    function copyTo(source, sourceIndex, target, targetIndex, count) {
        while (count--) {
            target[targetIndex++] = source[sourceIndex++];
        }
    }
    exports.copyTo = copyTo;
    function partition(f, xs) {
        const ys = [];
        const zs = [];
        let j = 0;
        let k = 0;
        for (let i = 0; i < xs.length; i++) {
            if (f(xs[i])) {
                ys[j++] = xs[i];
            }
            else {
                zs[k++] = xs[i];
            }
        }
        return [ys, zs];
    }
    exports.partition = partition;
    function permute(f, xs) {
        // Keep the type of the array
        const ys = xs.map(() => null);
        const checkFlags = new Array(xs.length);
        for (let i = 0; i < xs.length; i++) {
            const j = f(i);
            if (j < 0 || j >= xs.length) {
                throw new Error("Not a valid permutation");
            }
            ys[j] = xs[i];
            checkFlags[j] = 1;
        }
        for (let i = 0; i < xs.length; i++) {
            if (checkFlags[i] !== 1) {
                throw new Error("Not a valid permutation");
            }
        }
        return ys;
    }
    exports.permute = permute;
    function removeInPlace(item, xs) {
        const i = xs.indexOf(item);
        if (i > -1) {
            xs.splice(i, 1);
            return true;
        }
        return false;
    }
    exports.removeInPlace = removeInPlace;
    function setSlice(target, lower, upper, source) {
        const length = (upper || target.length - 1) - lower;
        if (ArrayBuffer.isView(target) && source.length <= length) {
            target.set(source, lower);
        }
        else {
            for (let i = lower | 0, j = 0; j <= length; i++, j++) {
                target[i] = source[j];
            }
        }
    }
    exports.setSlice = setSlice;
    function sortInPlaceBy(f, xs, dir = 1) {
        return xs.sort((x, y) => {
            x = f(x);
            y = f(y);
            return (x < y ? -1 : x === y ? 0 : 1) * dir;
        });
    }
    exports.sortInPlaceBy = sortInPlaceBy;
    function unzip(xs) {
        const bs = new Array(xs.length);
        const cs = new Array(xs.length);
        for (let i = 0; i < xs.length; i++) {
            bs[i] = xs[i][0];
            cs[i] = xs[i][1];
        }
        return [bs, cs];
    }
    exports.unzip = unzip;
    function unzip3(xs) {
        const bs = new Array(xs.length);
        const cs = new Array(xs.length);
        const ds = new Array(xs.length);
        for (let i = 0; i < xs.length; i++) {
            bs[i] = xs[i][0];
            cs[i] = xs[i][1];
            ds[i] = xs[i][2];
        }
        return [bs, cs, ds];
    }
    exports.unzip3 = unzip3;
    function chunkBySize(size, xs) {
        if (size < 1) {
            throw new Error("The input must be positive. parameter name: chunkSize");
        }
        if (xs.length === 0) {
            return [[]];
        }
        const result = [];
        // add each chunk to the result
        for (let x = 0; x < Math.ceil(xs.length / size); x++) {
            const start = x * size;
            const end = start + size;
            result.push(xs.slice(start, end));
        }
        return result;
    }
    exports.chunkBySize = chunkBySize;
    function getSubArray(xs, startIndex, count) {
        return xs.slice(startIndex, startIndex + count);
    }
    exports.getSubArray = getSubArray;
    function fill(target, targetIndex, count, value) {
        target.fill(value, targetIndex, targetIndex + count);
    }
    exports.fill = fill;
});

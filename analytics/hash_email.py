"""Script to hash email fields in a CSV file."""
import hashlib
import sys


def hash_lines(lines, keep=False):
    """Hash first field of each line and yield it.

    Args:
        lines: an iterator on the lines to hash.
        keep: if True, the first field is kept and the hash is added as an
            extra field at the end of the lines. If False, the first field is
            replaced by the hash.
    Yields:
        The modified line.
    """
    for line in lines:
        fields = line.strip().split(',')
        hashed_field = hashlib.sha1(fields[0].encode('utf-8')).hexdigest()
        if keep:
            fields = fields + [hashed_field]
        else:
            fields = [hashed_field] + fields[1:]
        yield '%s\n' % ','.join(fields)


def hash_files(inputfile, outputfile, keep=False):
    """Hash first field of each line of the input file and populate the output.

    Args:
        inputfile: path to the input CSV file.
        outputfile: path where to write the output CSV file.
        keep: if True, the first field is kept and the hash is added as an
            extra field at the end of the lines. If False, the first field is
            replaced by the hash.
    Returns:
        The number of hashed lines.
    """
    count = 0
    with open(outputfile, 'wt') as output:
        with open(inputfile, 'r') as input_lines:
            for line in hash_lines(input_lines, keep):
                output.write(line)
                count += 1
    return count


if __name__ == '__main__':
    print('%d lines hashed.' % hash_lines(*sys.argv[1:]))  # pylint: disable=no-value-for-parameter
